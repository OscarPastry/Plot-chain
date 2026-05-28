use axum::Router;

use crate::appstate::AppState;

pub mod health;
pub mod parcels;
pub mod registry;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest("/api/health", health::router())
        .nest("/api/parcels", parcels::router())
        .nest("/api/registry", registry::router())
}
