/**
 * Blockchain service — interacts with deployed smart contracts.
 *
 * TODO:
 * - Initialize ethers.js provider and wallet
 * - Load contract ABIs from packages/contracts/artifacts
 * - Implement NFT minting for new parcels
 * - Implement ownership transfer
 * - Read on-chain ownership data
 */

import { config } from "../config";

export class BlockchainService {
    // TODO: private provider: ethers.JsonRpcProvider;
    // TODO: private landNFTContract: ethers.Contract;
    // TODO: private landRegistryContract: ethers.Contract;

    constructor() {
        // TODO: Initialize with config.polygonRpcUrl
        console.log("BlockchainService initialized (stub) — RPC:", config.polygonRpcUrl);
    }

    /**
     * Mint a land parcel NFT.
     */
    async mintParcelNFT(
        owner: string,
        geohashes: string[],
        metadataUri: string
    ): Promise<{ tokenId: string; txHash: string }> {
        // TODO: Call LandNFT.mint()
        throw new Error("Not implemented — deploy contracts first");
    }

    /**
     * Transfer NFT ownership.
     */
    async transferNFT(
        tokenId: string,
        from: string,
        to: string
    ): Promise<{ txHash: string }> {
        // TODO: Call LandNFT.transferFrom()
        throw new Error("Not implemented");
    }

    /**
     * Verify on-chain ownership.
     */
    async verifyOwnership(tokenId: string): Promise<{ owner: string }> {
        // TODO: Call LandNFT.ownerOf()
        throw new Error("Not implemented");
    }
}
