/**
 * Parcel model / type definitions.
 *
 * TODO:
 * - Add database schema migration (knex, prisma, or raw SQL)
 * - Add PostGIS geometry column type
 */

export interface Parcel {
    id: string;
    owner_address: string;
    location: string;
    polygon: GeoJSON.Polygon;
    geohashes: string[];
    area_sqm: number;
    status: ParcelStatus;
    token_id: string | null;
    tx_hash: string | null;
    metadata_uri: string | null;
    created_at: Date;
    updated_at: Date;
}

export type ParcelStatus = "pending" | "registered" | "disputed" | "transferred";

/**
 * SQL schema reference (run manually or via migration):
 *
 * CREATE EXTENSION IF NOT EXISTS postgis;
 *
 * CREATE TABLE parcels (
 *   id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   owner_address VARCHAR(42) NOT NULL,
 *   location      TEXT NOT NULL,
 *   polygon       GEOMETRY(Polygon, 4326) NOT NULL,
 *   geohashes     TEXT[] NOT NULL DEFAULT '{}',
 *   area_sqm      DOUBLE PRECISION NOT NULL DEFAULT 0,
 *   status        VARCHAR(20) NOT NULL DEFAULT 'pending',
 *   token_id      VARCHAR(78),
 *   tx_hash       VARCHAR(66),
 *   metadata_uri  TEXT,
 *   created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_parcels_geom ON parcels USING GIST (polygon);
 * CREATE INDEX idx_parcels_owner ON parcels (owner_address);
 * CREATE INDEX idx_parcels_status ON parcels (status);
 */
