"use client";

import { useState } from "react";

/**
 * Wallet connection button using ethers.js + MetaMask.
 *
 * TODO:
 * - Integrate ethers.js BrowserProvider
 * - Handle network switching to Polygon
 * - Persist connection state
 */
export default function WalletConnect() {
    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = async () => {
        setIsConnecting(true);
        try {
            // TODO: Implement actual wallet connection
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // const signer = await provider.getSigner();
            // setAddress(await signer.getAddress());
            console.log("Wallet connection not yet implemented");
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    if (address) {
        return (
            <button className="px-4 py-2 rounded-lg bg-gray-800 text-emerald-400 text-sm font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
            </button>
        );
    }

    return (
        <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
        >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
    );
}
