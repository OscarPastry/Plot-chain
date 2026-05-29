use axum::{
    Json, Router,
    extract::{Path, State},
    routing::{get, post},
};

use uuid::Uuid;

use crate::{
    app_state::AppState,
    db::parcels as parcel_queries,
    error::AppErr,
    models::parcels::{CreateParcelRequest, ParcelResponse, TransferParcelRequest},
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_parcels).post(create_parcel))
        .route("/{id}", get(get_parcel))
        .route("/{id}/transfer", post(transfer_parcel))
}
async fn list_parcels(State(state): State<AppState>) -> Result<Json<Vec<ParcelResponse>>, AppErr> {
    let parcels = parcel_queries::list(&state.db).await?;
    Ok(Json(parcels))
}

async fn get_parcel(
    Path(id): Path<String>,
    State(state): State<AppState>,
) -> Result<Json<ParcelResponse>, AppErr> {
    let parcel_id = parse_uuid(&id)?;
    let parcel = parcel_queries::get_by_id(&state.db, parcel_id)
        .await?
        .ok_or_else(|| AppErr::NotFound(format!("parcel {} not found", id)))?;
    Ok(Json(parcel))
}
async fn create_parcel(
    State(state): State<AppState>,
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
    let parcel = parcel_queries::create(&state.db, payload).await?;

    Ok(Json(parcel))
}
async fn transfer_parcel(
    Path(id): Path<String>,
    State(_state): State<AppState>,
    Json(payload): Json<TransferParcelRequest>,
) -> Result<Json<serde_json::Value>, AppErr> {
    if payload.new_owner.trim().is_empty() {
        return Err(AppErr::BadRequest("newOwner is required".to_string()));
    }

    Ok(Json(serde_json::json!({
        "parcelId": id,
        "newOwner": &payload.new_owner,
        "message" : "Transfer flow not implemented yet"
    })))
}

fn parse_uuid(value: &str) -> Result<Uuid, AppErr> {
    Uuid::parse_str(value).map_err(|_| AppErr::BadRequest(format!("invalid parcel id: {}", value)))
}
