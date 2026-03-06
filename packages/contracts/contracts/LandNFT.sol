// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LandNFT
 * @notice ERC-721 NFT representing a land parcel on Plot-Chain.
 *         Each token ID corresponds to a registered land parcel.
 *
 * @dev Token metadata URI points to IPFS and contains:
 *      - Polygon coordinates (GeoJSON)
 *      - GeoHash-12 cell list
 *      - Area in square meters
 *      - Registration timestamp
 */
contract LandNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Mapping from token ID → geohash array (stored as encoded bytes for gas efficiency)
    mapping(uint256 => string[]) private _parcelGeohashes;

    event ParcelMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string metadataUri,
        uint256 geohashCount
    );

    constructor(
        address initialOwner
    ) ERC721("PlotChain Land", "PLOT") Ownable(initialOwner) {}

    /**
     * @notice Mint a new land parcel NFT.
     * @param to         The address that will own the minted NFT.
     * @param uri        IPFS URI containing parcel metadata (GeoJSON polygon, etc.).
     * @param geohashes  Array of GeoHash-12 strings that make up the parcel.
     * @return tokenId   The ID of the newly minted token.
     */
    function mintParcel(
        address to,
        string memory uri,
        string[] memory geohashes
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _parcelGeohashes[tokenId] = geohashes;

        emit ParcelMinted(tokenId, to, uri, geohashes.length);
        return tokenId;
    }

    /**
     * @notice Get the geohash cells for a parcel.
     */
    function getParcelGeohashes(
        uint256 tokenId
    ) public view returns (string[] memory) {
        return _parcelGeohashes[tokenId];
    }

    // ─── Required Overrides ────────────────────────────────

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
