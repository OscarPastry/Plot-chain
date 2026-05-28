use axum::{Json, Router, extract::State, routing::get};
use chrono::Utc;
use serde::Serialize;

use crate::app_state::AppState;

#[derive(Debug, Serialize)]
struct HealthResponse {
    status: &'static str,
    service: String,
    timestamp: String,
}
pub fn router() -> Router<AppState> {
    Router::new().route("/", get(health))
}

async fn health(State(app_state): State<AppState>) -> Json<HealthResponse> {
    // can also include additional information from app_state if needed
    Json(HealthResponse {
        status: "ok",
        service: app_state.config.service_name.clone(),
        timestamp: Utc::now().to_rfc3339(),
    })
}
