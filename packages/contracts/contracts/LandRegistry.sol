// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LandNFT.sol";

/**
 * @title LandRegistry
 * @notice Main registry contract for Plot-Chain.
 *         Manages parcel registration, government approval, and dispute resolution.
 *
 * @dev Multi-sig style: parcels require government validator approval.
 *      Flow: Submit Registration → Government Approves → NFT Minted
 */
contract LandRegistry is Ownable {
    LandNFT public landNFT;

    enum RegistrationStatus { Pending, Approved, Rejected, Disputed }

    struct Registration {
        address applicant;
        string metadataUri;
        string[] geohashes;
        RegistrationStatus status;
        uint256 tokenId;
        uint256 submittedAt;
        uint256 resolvedAt;
    }

    // Registration ID → Registration data
    mapping(uint256 => Registration) public registrations;
    uint256 public registrationCount;

    // Authorized government validators
    mapping(address => bool) public validators;

    // ─── Events ────────────────────────────────────────────

    event RegistrationSubmitted(
        uint256 indexed registrationId,
        address indexed applicant,
        uint256 geohashCount
    );

    event RegistrationApproved(
        uint256 indexed registrationId,
        uint256 indexed tokenId,
        address indexed validator
    );

    event RegistrationRejected(
        uint256 indexed registrationId,
        address indexed validator
    );

    event ValidatorAdded(address indexed validator);
    event ValidatorRemoved(address indexed validator);

    // ─── Modifiers ─────────────────────────────────────────

    modifier onlyValidator() {
        require(validators[msg.sender], "LandRegistry: caller is not a validator");
        _;
    }

    // ─── Constructor ───────────────────────────────────────

    constructor(address _landNFT) Ownable(msg.sender) {
        landNFT = LandNFT(_landNFT);
        validators[msg.sender] = true;
    }

    // ─── Validator Management ──────────────────────────────

    function addValidator(address validator) external onlyOwner {
        validators[validator] = true;
        emit ValidatorAdded(validator);
    }

    function removeValidator(address validator) external onlyOwner {
        validators[validator] = false;
        emit ValidatorRemoved(validator);
    }

    // ─── Registration Flow ─────────────────────────────────

    /**
     * @notice Submit a new land registration application.
     */
    function submitRegistration(
        string memory metadataUri,
        string[] memory geohashes
    ) external returns (uint256) {
        uint256 regId = registrationCount++;

        registrations[regId] = Registration({
            applicant: msg.sender,
            metadataUri: metadataUri,
            geohashes: geohashes,
            status: RegistrationStatus.Pending,
            tokenId: 0,
            submittedAt: block.timestamp,
            resolvedAt: 0
        });

        emit RegistrationSubmitted(regId, msg.sender, geohashes.length);
        return regId;
    }

    /**
     * @notice Approve a pending registration and mint the land NFT.
     */
    function approveRegistration(uint256 regId) external onlyValidator {
        Registration storage reg = registrations[regId];
        require(reg.status == RegistrationStatus.Pending, "LandRegistry: not pending");

        // Mint the land NFT
        uint256 tokenId = landNFT.mintParcel(
            reg.applicant,
            reg.metadataUri,
            reg.geohashes
        );

        reg.status = RegistrationStatus.Approved;
        reg.tokenId = tokenId;
        reg.resolvedAt = block.timestamp;

        emit RegistrationApproved(regId, tokenId, msg.sender);
    }

    /**
     * @notice Reject a pending registration.
     */
    function rejectRegistration(uint256 regId) external onlyValidator {
        Registration storage reg = registrations[regId];
        require(reg.status == RegistrationStatus.Pending, "LandRegistry: not pending");

        reg.status = RegistrationStatus.Rejected;
        reg.resolvedAt = block.timestamp;

        emit RegistrationRejected(regId, msg.sender);
    }

    /**
     * @notice Get registration details.
     */
    function getRegistration(uint256 regId) external view returns (
        address applicant,
        string memory metadataUri,
        RegistrationStatus status,
        uint256 tokenId,
        uint256 submittedAt,
        uint256 resolvedAt
    ) {
        Registration storage reg = registrations[regId];
        return (
            reg.applicant,
            reg.metadataUri,
            reg.status,
            reg.tokenId,
            reg.submittedAt,
            reg.resolvedAt
        );
    }
}
