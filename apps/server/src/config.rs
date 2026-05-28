use anyhow::{Context, Result};
use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub service_name: String,
    pub host: String,
    pub port: u16,
    pub frontend_url: String,
    pub database_url: String,
    pub redis_url: String,
    pub polygon_rpc_url: String,
    pub jwt_secret: String,
}

impl Config {
    pub fn from_env() -> Result<Self> {
        dotenvy::dotenv().ok(); // Load environment variables from .env file, if it exists
        let service_name =
            env::var("SERVICE_NAME").unwrap_or_else(|_| "plot-chain-api".to_string()); // If SERVICE_NAME is not set, it defaults to "plot-chain-api"

        let host = env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string()); // If HOST is not set, it defaults to "

        let port = env::var("PORT")
            .unwrap_or_else(|_| "8080".to_string()) // If PORT is not set, it defaults to "8080"
            .parse::<u16>() // Convert the string to a u16
            .context("Failed to parse PORT as u16")?; // Provide context if parsing fails

        let frontend_url =
            env::var("FRONTEND_URL").unwrap_or_else(|_| "http://localhost:3000".to_string()); // If FRONTEND_URL is not set, it defaults to "http://localhost:3000"

        let database_url = env::var("DATABASE_URL").context("DATABASE_URL must be set")?; // DATABASE_URL must be set, otherwise it returns an error with context

        let redis_url = env::var("REDIS_URL").context("REDIS_URL must be set")?; // REDIS_URL must be set, otherwise it returns an error with context

        let polygon_rpc_url = env::var("POLYGON_RPC_URL").context("POLYGON_RPC_URL must be set")?; // POLYGON_RPC_URL must be set, otherwise it returns an error with context

        let jwt_secret = env::var("JWT_SECRET").context("JWT_SECRET must be set")?; // JWT_SECRET must be set, otherwise it returns an error with context

        Ok(Self {
            service_name,
            host,
            port,
            frontend_url,
            database_url,
            redis_url,
            polygon_rpc_url,
            jwt_secret,
        })
    }

    pub fn address(&self) -> String {
        format!("{}:{}", self.host, self.port) // Combines host and port into a single string in the format "host:port"
    }
}
