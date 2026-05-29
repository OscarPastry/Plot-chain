use std::sync::Arc;

use sqlx::PgPool; // PgPool → manages a pool of connections to a PostgreSQL database, allowing for efficient database access across multiple threads in the application

use crate::config::Config;

#[derive(Clone)]
pub struct AppState {
    pub config: Arc<Config>,
    pub db: PgPool, // PgPool is added to the AppState struct to allow for shared access to the database connection pool across different parts of the application
}

impl AppState {
    pub fn new(config: Config, db: PgPool) -> Self {
        Self {
            config: Arc::new(config), // Wraps the Config in an Arc to allow for shared ownership across threads
            db,
        }
    }
}
