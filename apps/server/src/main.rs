//Axum server main point
//
use axum::{Json, Router, routing::get};
//Router → defines routes/endpoints
//routing::get → specifies a GET request handler
//Json → converts Rust structs into JSON responses
//
use serde::Serialize;
// Serialize → allows us to convert Rust structs into JSON format for API responses
//
use std::net::SocketAddr;
// SocketAddr → represents an IP address and port combination for the server to listen on
//
use tower_http::{cors::CorsLayer, trace::TraceLayer};
// CorsLayer → handles Cross-Origin Resource Sharing (CORS) to allow requests from different origins
// TraceLayer → provides logging and tracing for incoming HTTP requests
//
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
// tracing_subscriber → sets up logging and tracing for the application, allowing us to monitor and debug the server's behavior
//

#[derive(Serialize)]
//automatically generates code to convert the struct into JSON.
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
//This macro:
//1.creates the async runtime
//2.allows main to be async
async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new("info, tower_http=info"))
        .with(tracing_subscriber::fmt::layer()) // Pretty-prints logs to terminal
        .init();
    let app = Router::new() // Creates a new Axum router
        .route("/api/health", get(health))
        .layer(CorsLayer::permissive()) // Allows request from any origin
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
