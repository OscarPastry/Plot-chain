"use client";

import { useEffect, useRef } from "react";

/**
 * Map component — wraps Mapbox GL JS (or Leaflet).
 *
 * TODO:
 * - Initialize the map with a default center (India)
 * - Enable polygon drawing for parcel registration
 * - Display GeoHash-12 grid overlay
 * - Show registered parcels as coloured polygons
 */

interface MapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  className?: string;
}

export default function Map({
  center = [78.9629, 20.5937], // India center
  zoom = 5,
  className = "",
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // TODO: Initialize Mapbox GL JS here
    // const map = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    //   style: "mapbox://styles/mapbox/satellite-streets-v12",
    //   center,
    //   zoom,
    // });

    // return () => map.remove();
  }, [center, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-[500px] rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 ${className}`}
    >
      <div className="text-center">
        <p className="text-lg font-semibold">🗺️ Map View</p>
        <p className="text-sm mt-1">
          Add your Mapbox token to <code>.env.local</code> to activate
        </p>
      </div>
    </div>
  );
}
