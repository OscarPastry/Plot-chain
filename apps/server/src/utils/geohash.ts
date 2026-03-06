/**
 * GeoHash utility — server-side implementation.
 *
 * Mirrors the frontend geohash.ts but runs server-side.
 * In production, consider using the `ngeohash` npm package.
 *
 * TODO: Implement or use ngeohash / h3-js
 */

export function encode(lat: number, lng: number, precision: number = 12): string {
    // TODO: Implement
    return `gh_${lat.toFixed(6)}_${lng.toFixed(6)}_p${precision}`;
}

export function decode(geohash: string): { lat: number; lng: number } {
    // TODO: Implement
    return { lat: 0, lng: 0 };
}

export function polygonToGeohashes(
    polygon: [number, number][],
    precision: number = 12
): string[] {
    // TODO: Implement polygon fill
    return [];
}
