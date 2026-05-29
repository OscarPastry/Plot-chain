pub mod parcels;

use anyhow::{Context, Result};
use sqlx::{PgPool, postgres::PgPoolOptions};

pub async fn connect_db(database_url: &str) -> Result<PgPool> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await
        .context("failed to connect to postgres")?;

    Ok(pool)
}
