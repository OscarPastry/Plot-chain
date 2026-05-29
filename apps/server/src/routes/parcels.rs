use axum::{
    Json, Router,
    extract::{Path, State},
    routing::{get, post},
};

use chrono::Utc;

use crate::{
    app_state::AppState,
    error::AppErr,
    models::parcels::{CreateParcelRequest, ParcelResponse, ParcelStatus, TransferParcelRequest},
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_parcels).post(create_parcel))
        .route("/{id}", get(get_parcel))
        .route("/{id}/transfer", post(transfer_parcel))
}
async fn list_parcels(State(_state): State<AppState>) -> Result<Json<Vec<ParcelResponse>>, AppErr> {
    let parcels = vec![
        sample_parcel(
            "PC-0001".to_string(),
            "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD28".to_string(),
        ),
        sample_parcel(
            "PC-0002".to_string(),
            "0x8ba1f109551bD432803012645Ac136ddd64DBA72".to_string(),
        ),
    ];

    Ok(Json(parcels))
}

async fn get_parcel(
    Path(id): Path<String>,
    State(_state): State<AppState>,
) -> Result<Json<ParcelResponse>, AppErr> {
    if id.trim().is_empty() {
        return Err(AppErr::BadRequest("parcel id is required".to_string()));
    }

    Ok(Json(sample_parcel(
        id,
        "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD28".to_string(),
    )))
}
async fn create_parcel(
    State(_state): State<AppState>,
    Json(payload): Json<CreateParcelRequest>,
) -> Result<Json<ParcelResponse>, AppErr> {
    if payload.owner_address.trim().is_empty() {
        return Err(AppErr::BadRequest("ownerAddress is required".to_string()));
    }

    if payload.location.trim().is_empty() {
        return Err(AppErr::BadRequest("location is required".to_string()));
    }

    if payload.polygon.len() < 3 {
        return Err(AppErr::BadRequest(
            "polygon must contain at least 3 points".to_string(),
        ));
    }

    Ok(Json(ParcelResponse {
        id: "PC-NEW-001".to_string(),
        owner: payload.owner_address,
        polygon: payload.polygon,
        geohashes: vec![],
        area: 0.0,
        location: payload.location,
        status: ParcelStatus::Pending,
        token_id: None,
        created_at: Utc::now().to_rfc3339(),
    }))
}
async fn transfer_parcel(
    Path(id): Path<String>,
    State(_state): State<AppState>,
    Json(payload): Json<TransferParcelRequest>,
) -> Result<Json<ParcelResponse>, AppErr> {
    if payload.new_owner_address.trim().is_empty() {
        return Err(AppErr::BadRequest("newOwner is required".to_string()));
    }

    Ok(Json(ParcelResponse {
        id,
        owner: payload.new_owner_address,
        polygon: vec![
            [77.5946, 12.9716],
            [77.5950, 12.9716],
            [77.5950, 12.9720],
            [77.5946, 12.9720],
        ],
        geohashes: vec![],
        area: 850.0,
        location: "Transferred parcel".to_string(),
        status: ParcelStatus::Registered,
        token_id: Some("1".to_string()),
        created_at: Utc::now().to_rfc3339(),
    }))
}

fn sample_parcel(id: String, owner: String) -> ParcelResponse {
    ParcelResponse {
        id,
        owner,
        polygon: vec![
            [77.5946, 12.9716],
            [77.5950, 12.9716],
            [77.5950, 12.9720],
            [77.5946, 12.9720],
        ],
        geohashes: vec![],
        area: 850.0,
        location: "Koramangala, Bengaluru, Karnataka".to_string(),
        status: ParcelStatus::Registered,
        token_id: Some("1".to_string()),
        created_at: Utc::now().to_rfc3339(),
    }
}
