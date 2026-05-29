use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct VerifyParcelResponse {
    pub valid: bool,
    pub message: String,
    pub parcel_id: String,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct TransferRecord {
    pub from: String,
    pub to: String,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RegistryHistoryResponse {
    pub parcel_id: String,
    pub transfers: Vec<TransferRecord>,
    pub message: String,
}
