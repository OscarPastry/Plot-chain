/**
 * API client for communicating with the Plot-Chain backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

/**
 * Generic fetch wrapper with error handling.
 */
async function request<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || "API request failed");
    }

    return res.json();
}

// ─── Parcel Endpoints ──────────────────────────────────

export interface Parcel {
    id: string;
    owner: string;
    polygon: [number, number][];
    geohashes: string[];
    area: number;
    location: string;
    status: "registered" | "pending" | "disputed";
    tokenId?: string;
    createdAt: string;
}

export const parcels = {
    list: () => request<Parcel[]>("/parcels"),

    getById: (id: string) => request<Parcel>(`/parcels/${id}`),

    create: (data: {
        polygon: [number, number][];
        location: string;
        ownerAddress: string;
    }) =>
        request<Parcel>("/parcels", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    transfer: (id: string, newOwner: string) =>
        request<Parcel>(`/parcels/${id}/transfer`, {
            method: "POST",
            body: JSON.stringify({ newOwner }),
        }),
};

// ─── Registry Endpoints ────────────────────────────────

export const registry = {
    verify: (id: string) => request<{ valid: boolean }>(`/registry/verify/${id}`),

    history: (id: string) =>
        request<{ transfers: Array<{ from: string; to: string; timestamp: string }> }>(
            `/registry/history/${id}`
        ),
};

// ─── Health ────────────────────────────────────────────

export const health = {
    check: () => request<{ status: string; timestamp: string }>("/health"),
};
