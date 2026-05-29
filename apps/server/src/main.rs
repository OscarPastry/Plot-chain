//Axum server main point
//
//
mod config;
//config → contains configuration settings for the server, such as environment variables or application settings
mod error;
//error → defines custom error types and handling logic for the server, allowing us to manage and respond to errors in a consistent way across the application
mod app_state;
//app_state → defines the shared application state that can be accessed across different parts of the server, such as configuration settings or database connections
//
mod models;
//models → defines the data structures used in the application, such as request and response formats for the API endpoints, allowing us to organize and manage the data used in the server in a structured way
//
mod routes;
//routes → defines the different API endpoints and their corresponding request handlers, organizing the server's functionality into modular components
//
//use axum::{Json, Router, extract::State, routing::get};
//Router → defines routes/endpoints
//routing::get → specifies a GET request handler
//Json → converts Rust structs into JSON responses
//extract::State → allows us to access shared application state within request handlers
//
//use serde::Serialize;
// Serialize → allows us to convert Rust structs into JSON format for API responses
//
//use std::net::SocketAddr;
// SocketAddr → represents an IP address and port combination for the server to listen on
//
use tower_http::{cors::CorsLayer, trace::TraceLayer};
// CorsLayer → handles Cross-Origin Resource Sharing (CORS) to allow requests from different origins
// TraceLayer → provides logging and tracing for incoming HTTP requests
//
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
// tracing_subscriber → sets up logging and tracing for the application, allowing us to monitor and debug the server's behavior
//
use crate::app_state::AppState;
use crate::config::Config;

#[tokio::main]
//This macro:
//1.creates the async runtime
//2.allows main to be async
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new("info, tower_http=info"))
        .with(tracing_subscriber::fmt::layer()) // Pretty-prints logs to terminal
        .init();
    let config = Config::from_env()?;
    let app_state = AppState::new(config.clone());
    let app = routes::create_router() // Creates a new Axum router
        .layer(CorsLayer::permissive()) // Allows request from any origin
        .layer(TraceLayer::new_for_http())
        .with_state(app_state); // Adds shared application state to the router
    let addr = config.address();
    let listener = tokio::net::TcpListener::bind(&addr).await?;

    tracing::info!("{} is running on http://{}", config.service_name, addr);

    axum::serve(listener, app).await?;
    Ok(())
}
