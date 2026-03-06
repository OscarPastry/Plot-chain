/**
 * Web3 / ethers.js provider setup for Plot-Chain.
 *
 * TODO:
 * - Configure ethers.js JsonRpcProvider for Polygon
 * - Set up contract instances (LandRegistry, LandNFT)
 * - Export typed contract wrappers
 */

// Deployed contract addresses (update after deploying)
export const CONTRACT_ADDRESSES = {
    landRegistry: "0x0000000000000000000000000000000000000000",
    landNFT: "0x0000000000000000000000000000000000000000",
} as const;

// Chain configuration
export const CHAIN_CONFIG = {
    chainId: 80001, // Polygon Mumbai
    chainName: "Polygon Mumbai Testnet",
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://rpc-mumbai.maticvigil.com",
    blockExplorer: "https://mumbai.polygonscan.com",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
} as const;

/**
 * Get a read-only provider.
 * TODO: implement with ethers.js
 */
export function getProvider() {
    // return new ethers.JsonRpcProvider(CHAIN_CONFIG.rpcUrl);
    throw new Error("Not implemented — install ethers and implement");
}

/**
 * Get the LandRegistry contract instance.
 * TODO: implement with ethers.js + ABI
 */
export function getLandRegistryContract() {
    throw new Error("Not implemented — deploy contracts first");
}

/**
 * Get the LandNFT contract instance.
 * TODO: implement with ethers.js + ABI
 */
export function getLandNFTContract() {
    throw new Error("Not implemented — deploy contracts first");
}
