use axum::{
    Json, Router,
    extract::{Path, State},
    routing::get,
};

use crate::{
    app_state::AppState,
    error::AppErr,
    models::registry::{RegistryHistoryResponse, TransferRecord, VerifyParcelResponse},
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/verify/{id}", get(verify_parcel))
        .route("/history/{id}", get(parcel_history))
}

async fn verify_parcel(
    Path(id): Path<String>,
    State(_state): State<AppState>,
) -> Result<Json<VerifyParcelResponse>, AppErr> {
    if id.trim().is_empty() {
        return Err(AppErr::BadRequest("parcel id is required".to_string()));
    }

    // TODO: verify against on-chain data via blockchain_service
    Ok(Json(VerifyParcelResponse {
        valid: false,
        parcel_id: id,
        message: "Verification not implemented yet".to_string(),
    }))
}

async fn parcel_history(
    Path(id): Path<String>,
    State(_state): State<AppState>,
) -> Result<Json<RegistryHistoryResponse>, AppErr> {
    if id.trim().is_empty() {
        return Err(AppErr::BadRequest("parcel id is required".to_string()));
    }

    // TODO: fetch transfer events from blockchain_service
    Ok(Json(RegistryHistoryResponse {
        parcel_id: id,
        transfers: vec![TransferRecord {
            from: "0x0000000000000000000000000000000000000000".to_string(),
            to: "0x0000000000000000000000000000000000000000".to_string(),
            timestamp: chrono::Utc::now().to_rfc3339(),
        }],
        message: "History not implemented yet".to_string(),
    }))
}
