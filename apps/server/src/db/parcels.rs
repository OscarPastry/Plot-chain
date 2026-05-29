use anyhow::{Context, Result, anyhow}; // this is for better error handling
use chrono::{DateTime, Utc};
use serde_json::Value; // Value is a type from the serde_json crate that can represent any valid JSON value, which allows us to work with dynamic JSON data
use sqlx::{FromRow, PgPool}; // FromRow is a trait that allows us to map database rows to Rust structs, and PgPool is a connection pool for PostgreSQL databases
use uuid::Uuid; // Uuid is a library for generating and handling universally unique identifiers (UUIDs), which can be used as unique keys for database records

use crate::models::parcel::{CreateParcelRequest, ParcelResponse, ParcelStatus};

#[derive(Debug, FromRow)]
struct ParcelRow {
    id: Uuid,
    owner_address: String,
    polygon_json: Value,
    geohashes: Vec<String>,
    area_sqm: f64,
    location: String,
    status: String,
    token_id: Option<String>,
    created_at: DateTime<Utc>,
}

pub async fn list(pool: &PgPool) -> Result<Vec<ParcelResponse>> {
    let rows = sqlx::query_as::<_, ParcelRow>(
        r#"SELECT
            id
            owner_address
            polygon_json
            geohashes
            area_sqm
            location
            status
            token_id
            created_at
        FROM parcels
        ORDER BY created_at DESC
        "#,
    )
    .fetch_all(pool)
    .await
    .context("Failed to list parcels")?;

    rows.into_iter()
        .map(row_to_response)
        .collect::<Result<Vec<_>>>()
}

pub async fn get_by_id(pool: &PgPool, id: Uuid) -> Result<ParcelResponse> {
    let row = sqlx::query_as::<_, ParcelRow>(
        r#"SELECT
            id
            owner_address
            polygon_json
            geohashes
            area_sqm
            location
            status
            token_id
            created_at
        FROM parcels
        WHERE id = $1"#,
    )
    .bind(id)
    .fetch_one(pool)
    .await
    .context("Failed to get parcel by id")?;

    row.map(row_to_response).transpose()
}

pub async fn create(pool: &PgPool, payload: CreateParcelRequest) -> Result<ParcelResponse> {
    let polygon_json =
        serde_json::to_value(&payload.polygon).context("Failed to serialize polygon")?;
    let row = sqlx::query_as::<_, ParcelRow>(
        r#"INSERT INTO parcels (
            owner_address,
            polygon_json,
            geohashes,
            area_sqm,
            location,
            status
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id
            owner_address
            polygon_json
            geohashes
            area_sqm
            location
            status
            token_id
            created_at
        "#,
    )
    .bind(&payload.owner_address)
    .bind(polygon_json)
    .bind(Vec::<String>::new()) // Placeholder for geohashes
    .bind(0.0_f64) // Placeholder for area
    .bind(&payload.location)
    .bind(ParcelStatus::Pending.to_string())
    .fetch_one(pool)
    .await
    .context("Failed to create parcel")?;

    row_to_response(row)
}

fn row_to_response(row: ParcelRow) -> Result<ParcelResponse> {
    let polygon: Vec<[f64; 2]> = serde_json::from_value(row.polygon_json)
        .context("invalid polygon_json stored in database")?;
    Ok(ParcelResponse {
        id: row.id.to_string(),
        owner: row.order_address,
        polygon,
        geohashes: row.geohashes,
        area: row.area_sqm,
        location: row.location,
        status: parse_status(&row.status)?,
        token_id: row.token_id,
        created_at: row.created_at.to_rfc3339(),
    })
}

fn parse_status(value: &str) -> Result<ParcelStatus> {
    match value {
        "registered" => Ok(ParcelStatus::Registered),
        "pending" => Ok(ParcelStatus::Pending),
        "disputed" => Ok(ParcelStatus::Disputed),
        other => Err(anyhow!("invalid parcel status in database: {}", other)),
    }
}
