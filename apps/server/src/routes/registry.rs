use axum::{
    Json, Router,
    extract::{Path, State},
    routing::get,
};
use chrono::Utc;

use crate::{
    app_state::AppState,
    error::AppError,
    models::registry::{RegistryHistoryResponse, TransferRecord, VerifyParcelResponse},
};

pub fn route() -> Router<AppState> {
    Router::new()
        .route("/verify/{id}", get(verify_parcel))
        .route("/history/{id}", get(parcel_history))
}

async fn verify_parcel(
    Path(id): Path<String>,
    State(_state): State<AppState>,
) -> Result<Json<VerifyParcelResponse>, AppError> {
    if id.trim().is_empty() {
        return Err(AppErr::BadRequest("Parcel ID cannot be empty".to_string()));
    }

    Ok(Json(VerifyParcelResponse {
        valid: true,
        parcel_id: id,
        message: "Parcel verification is currently using placeholder data".to_string(),
    }))
}

async fn parcel_history(
    Path(id): Path<String>,
    State(_state): State<AppState>,
) -> Result<Json<RegistryHistoryResponse>, AppError> {
    if id.trim().is_empty() {
        return Err(AppError::BadRequest("parcel id is required".to_string()));
    }

    let transfers = vec![
        TransferRecord {
            from: "0x1111111111111111111111111111111111111111".to_string(),
            to: "0x2222222222222222222222222222222222222222".to_string(),
            timestamp: Utc::now().to_rfc3339(),
        },
        TransferRecord {
            from: "0x2222222222222222222222222222222222222222".to_string(),
            to: "0x3333333333333333333333333333333333333333".to_string(),
            timestamp: Utc::now().to_rfc3339(),
        },
    ];

    Ok(Json(RegistryHistoryResponse {
        parcel_id: id,
        transfers,
        message: "Parcel history is currently using placeholder data".to_string(),
    }))
}
