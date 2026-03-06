import { expect } from "chai";
import { ethers } from "hardhat";
import { LandNFT, LandRegistry } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Plot-Chain Contracts", function () {
    let landNFT: LandNFT;
    let landRegistry: LandRegistry;
    let owner: SignerWithAddress;
    let applicant: SignerWithAddress;
    let validator: SignerWithAddress;

    const sampleGeohashes = ["u4pruydqqvj8", "u4pruydqqvj9", "u4pruydqqvjb"];
    const sampleMetadataUri = "ipfs://QmSampleMetadataHash123";

    beforeEach(async function () {
        [owner, applicant, validator] = await ethers.getSigners();

        // Deploy LandNFT
        const LandNFTFactory = await ethers.getContractFactory("LandNFT");
        landNFT = await LandNFTFactory.deploy(owner.address);
        await landNFT.waitForDeployment();

        // Deploy LandRegistry
        const LandRegistryFactory = await ethers.getContractFactory("LandRegistry");
        landRegistry = await LandRegistryFactory.deploy(await landNFT.getAddress());
        await landRegistry.waitForDeployment();

        // Transfer NFT ownership to registry
        await landNFT.transferOwnership(await landRegistry.getAddress());
    });

    describe("Deployment", function () {
        it("should deploy LandNFT with correct name and symbol", async function () {
            expect(await landNFT.name()).to.equal("PlotChain Land");
            expect(await landNFT.symbol()).to.equal("PLOT");
        });

        it("should set the deployer as validator", async function () {
            expect(await landRegistry.validators(owner.address)).to.be.true;
        });
    });

    describe("Registration Flow", function () {
        it("should allow anyone to submit a registration", async function () {
            const tx = await landRegistry
                .connect(applicant)
                .submitRegistration(sampleMetadataUri, sampleGeohashes);

            await expect(tx)
                .to.emit(landRegistry, "RegistrationSubmitted")
                .withArgs(0, applicant.address, sampleGeohashes.length);
        });

        it("should allow a validator to approve and mint NFT", async function () {
            // Submit
            await landRegistry
                .connect(applicant)
                .submitRegistration(sampleMetadataUri, sampleGeohashes);

            // Approve
            const tx = await landRegistry.connect(owner).approveRegistration(0);
            await expect(tx).to.emit(landRegistry, "RegistrationApproved");

            // Verify NFT ownership
            expect(await landNFT.ownerOf(0)).to.equal(applicant.address);
        });

        it("should allow a validator to reject a registration", async function () {
            await landRegistry
                .connect(applicant)
                .submitRegistration(sampleMetadataUri, sampleGeohashes);

            const tx = await landRegistry.connect(owner).rejectRegistration(0);
            await expect(tx).to.emit(landRegistry, "RegistrationRejected");
        });

        it("should not allow non-validators to approve", async function () {
            await landRegistry
                .connect(applicant)
                .submitRegistration(sampleMetadataUri, sampleGeohashes);

            await expect(
                landRegistry.connect(applicant).approveRegistration(0)
            ).to.be.revertedWith("LandRegistry: caller is not a validator");
        });
    });

    describe("Validator Management", function () {
        it("should allow owner to add a validator", async function () {
            await landRegistry.addValidator(validator.address);
            expect(await landRegistry.validators(validator.address)).to.be.true;
        });

        it("should allow added validators to approve registrations", async function () {
            await landRegistry.addValidator(validator.address);

            await landRegistry
                .connect(applicant)
                .submitRegistration(sampleMetadataUri, sampleGeohashes);

            await expect(
                landRegistry.connect(validator).approveRegistration(0)
            ).to.emit(landRegistry, "RegistrationApproved");
        });
    });
});
