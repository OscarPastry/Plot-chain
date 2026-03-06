"use client";

import Link from "next/link";

/**
 * Top navigation bar for Plot-Chain.
 */
export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <span className="text-emerald-400">⛓️</span>
                    <span className="text-white">Plot-Chain</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                    <Link href="/" className="hover:text-white transition-colors">
                        Map
                    </Link>
                    <Link
                        href="/registry"
                        className="hover:text-white transition-colors"
                    >
                        Registry
                    </Link>
                    <Link
                        href="/dashboard"
                        className="hover:text-white transition-colors"
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Wallet Button Placeholder */}
                <div className="flex items-center gap-3">
                    {/* TODO: Replace with WalletConnect component */}
                    <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </nav>
    );
}
