use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};

use serde::Serialize;
use thiserror::Error;
use tracing::error;

#[derive(Debug, Serialize)]
struct ErrorBody {
    error: String,
    message: String,
}

#[derive(Error, Debug)]
pub enum AppErr {
    #[error("{0}")]
    BadRequest(String),

    #[error("{0}")]
    Unauthorized(String),

    #[error("{0}")]
    NotFound(String),

    #[error(transparent)]
    InternalError(#[from] anyhow::Error),
}

impl IntoResponse for AppErr {
    fn into_response(self) -> Response {
        let (status, error_name, message) = match self {
            AppErr::BadRequest(msg) => (StatusCode::BAD_REQUEST, "Bad Request", msg),
            AppErr::Unauthorized(msg) => (StatusCode::UNAUTHORIZED, "Unauthorized", msg),
            AppErr::NotFound(msg) => (StatusCode::NOT_FOUND, "Not Found", msg),
            AppErr::InternalError(err) => {
                error!("Internal error: {:?}", err);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Internal Server Error",
                    "An unexpected error occurred".to_string(),
                )
            }
        };
        let body = Json(ErrorBody {
            error: error_name.to_string(),
            message,
        });
        (status, body).into_response()
    }
}
