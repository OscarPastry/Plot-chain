use axum::{Json, Router, extract::State, routing::get};
use chrono::Utc;
use serde::Serialize;

use create::app_state::AppState;

#[derive(debug, Serialize)]
struct HealthResponse {
    status: &'static str,
    service: &'static str,
    timestamp: String,
}
pub fn health_router() -> Router<AppState> {
    Router::new().route("/", get(health))
}

async fn health(State(app_state): State<AppState>) -> Json<HealthResponse> {
    // can also include additional information from app_state if needed
    Json(HealthResponse {
        status: "ok",
        service: app_state.service_name.clone(),
        timestamp: Utc::now().to_rfc3339(),
    })
}
