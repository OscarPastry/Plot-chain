use anyhow::{Context, Result, anyhow};
use chrono::{DateTime, Utc};
use serde_json::Value;
use sqlx::{FromRow, PgPool};
use uuid::Uuid;

use crate::models::parcels::{CreateParcelRequest, ParcelResponse, ParcelStatus};

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
            id,
            owner_address,
            polygon_json,
            geohashes,
            area_sqm,
            location,
            status,
            token_id,
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

pub async fn get_by_id(pool: &PgPool, id: Uuid) -> Result<Option<ParcelResponse>> {
    let row = sqlx::query_as::<_, ParcelRow>(
        r#"SELECT
            id,
            owner_address,
            polygon_json,
            geohashes,
            area_sqm,
            location,
            status,
            token_id,
            created_at
        FROM parcels
        WHERE id = $1"#,
    )
    .bind(id)
    .fetch_optional(pool)
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
            id,
            owner_address,
            polygon_json,
            geohashes,
            area_sqm,
            location,
            status,
            token_id,
            created_at
        "#,
    )
    .bind(&payload.owner_address)
    .bind(polygon_json)
    .bind(Vec::<String>::new())
    .bind(0.0_f64)
    .bind(&payload.location)
    .bind("pending")
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
        owner: row.owner_address,
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
