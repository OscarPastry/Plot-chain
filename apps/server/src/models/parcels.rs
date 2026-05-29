use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum ParcelStatus {
    Registered,
    Pending,
    Disputed,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ParcelResponse {
    pub id: String,
    pub owner: String,
    pub polygon: Vec<[f64; 2]>,
    pub geohashes: Vec<String>,
    pub area: f64,
    pub location: String,
    pub status: ParcelStatus,
    pub token_id: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateParcelRequest {
    pub polygon: Vec<[f64; 2]>,
    pub location: String,
    pub owner_address: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TransferParcelRequest {
    pub new_owner: String,
}
