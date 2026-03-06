import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    // 1. Deploy LandNFT
    console.log("\n📦 Deploying LandNFT...");
    const LandNFT = await ethers.getContractFactory("LandNFT");
    const landNFT = await LandNFT.deploy(deployer.address);
    await landNFT.waitForDeployment();
    const landNFTAddress = await landNFT.getAddress();
    console.log("✅ LandNFT deployed to:", landNFTAddress);

    // 2. Deploy LandRegistry
    console.log("\n📦 Deploying LandRegistry...");
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    const landRegistry = await LandRegistry.deploy(landNFTAddress);
    await landRegistry.waitForDeployment();
    const landRegistryAddress = await landRegistry.getAddress();
    console.log("✅ LandRegistry deployed to:", landRegistryAddress);

    // 3. Transfer LandNFT ownership to LandRegistry
    //    (so the registry contract can mint NFTs)
    console.log("\n🔑 Transferring LandNFT ownership to LandRegistry...");
    await landNFT.transferOwnership(landRegistryAddress);
    console.log("✅ LandNFT ownership transferred to LandRegistry");

    // Summary
    console.log("\n" + "═".repeat(50));
    console.log("📋 Deployment Summary");
    console.log("═".repeat(50));
    console.log(`  LandNFT:      ${landNFTAddress}`);
    console.log(`  LandRegistry: ${landRegistryAddress}`);
    console.log("═".repeat(50));
    console.log("\n⚠️  Update CONTRACT_ADDRESSES in apps/web/src/lib/web3.ts");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
