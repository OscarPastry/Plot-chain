
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS parcels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_address VARCHAR(42) NOT NULL,
    polygon_json JSONB NOT NULL,
    geohashes TEXT[] NOT NULL DEFAULT '{}',
    area_sqm DOUBLE PRECISION NOT NULL DEFAULT 0,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    token_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT parcels_status_check
        CHECK (status IN ('registered', 'pending', 'disputed'))
);
