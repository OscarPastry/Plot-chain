use axum::{Json, Router, routing::get};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
    service: &'static str,
    timestamp: String,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok",
        service: "Plot-chain-api",
        timestamp: chrono::Utc::now().to_rfc3339(),
    })
}

#[tokio::main]

async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new("info, tower_http=info"))
        .with(tracing_subscriber::fmt::layer())
        .init();
    let app = Router::new()
        .route("/api/health", get(health))
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http());
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    tracing::info!("Listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Failed to bind to address");
    axum::serve(listener, app)
        .await
        .expect("Failed to start server");
}
