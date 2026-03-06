/**
 * Global state management using Zustand.
 *
 * TODO: Install zustand — `npm install zustand`
 *
 * Manages:
 * - Wallet connection state
 * - Selected parcel
 * - Map view state
 */

// import { create } from "zustand";

export interface AppState {
    // Wallet
    walletAddress: string | null;
    isWalletConnected: boolean;
    setWalletAddress: (address: string | null) => void;

    // Map
    mapCenter: [number, number];
    mapZoom: number;
    setMapView: (center: [number, number], zoom: number) => void;

    // Selected parcel
    selectedParcelId: string | null;
    setSelectedParcel: (id: string | null) => void;

    // Drawing mode
    isDrawing: boolean;
    toggleDrawing: () => void;
    drawnPolygon: [number, number][] | null;
    setDrawnPolygon: (polygon: [number, number][] | null) => void;
}

/**
 * TODO: Uncomment after installing zustand
 *
 * export const useStore = create<AppState>((set) => ({
 *   // Wallet
 *   walletAddress: null,
 *   isWalletConnected: false,
 *   setWalletAddress: (address) =>
 *     set({ walletAddress: address, isWalletConnected: !!address }),
 *
 *   // Map
 *   mapCenter: [78.9629, 20.5937],
 *   mapZoom: 5,
 *   setMapView: (center, zoom) => set({ mapCenter: center, mapZoom: zoom }),
 *
 *   // Selected parcel
 *   selectedParcelId: null,
 *   setSelectedParcel: (id) => set({ selectedParcelId: id }),
 *
 *   // Drawing mode
 *   isDrawing: false,
 *   toggleDrawing: () => set((s) => ({ isDrawing: !s.isDrawing })),
 *   drawnPolygon: null,
 *   setDrawnPolygon: (polygon) => set({ drawnPolygon: polygon }),
 * }));
 */

// Temporary placeholder export until zustand is installed
export const useStore = {} as AppState;
