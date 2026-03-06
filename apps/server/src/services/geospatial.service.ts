/**
 * Geospatial service — PostGIS queries for spatial operations.
 *
 * TODO:
 * - Connect to PostgreSQL with PostGIS extension
 * - Use pg or knex with PostGIS functions
 * - Implement spatial queries (ST_Contains, ST_Intersects, ST_Area)
 */

export class GeospatialService {
    /**
     * Check if a polygon overlaps with any existing registered parcel.
     */
    async checkOverlap(
        polygon: [number, number][]
    ): Promise<{ overlaps: boolean; conflictingIds: string[] }> {
        // TODO: SELECT id FROM parcels WHERE ST_Intersects(geom, ST_GeomFromGeoJSON(...))
        throw new Error("Not implemented — connect PostGIS first");
    }

    /**
     * Calculate the area of a polygon in square meters.
     */
    async calculateArea(polygon: [number, number][]): Promise<number> {
        // TODO: SELECT ST_Area(ST_GeomFromGeoJSON(...)::geography) as area
        throw new Error("Not implemented");
    }

    /**
     * Find parcels within a bounding box (for map viewport queries).
     */
    async findInBounds(bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    }): Promise<Array<{ id: string; polygon: [number, number][] }>> {
        // TODO: SELECT * FROM parcels WHERE ST_Intersects(geom, ST_MakeEnvelope(...))
        throw new Error("Not implemented");
    }
}
