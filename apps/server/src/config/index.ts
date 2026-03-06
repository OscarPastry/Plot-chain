import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const config = {
    port: parseInt(process.env.PORT || "4000", 10),
    databaseUrl: process.env.DATABASE_URL || "postgresql://plotchain:plotchain@localhost:5432/plotchain",
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
    jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
    polygonRpcUrl: process.env.POLYGON_RPC_URL || "https://rpc-mumbai.maticvigil.com",
    ipfs: {
        gatewayUrl: process.env.IPFS_GATEWAY_URL || "https://gateway.pinata.cloud/ipfs/",
        pinataApiKey: process.env.PINATA_API_KEY || "",
        pinataSecret: process.env.PINATA_SECRET || "",
    },
} as const;
