import { Request, Response, NextFunction } from "express";

/**
 * Auth middleware — validates JWT tokens.
 *
 * TODO:
 * - Implement JWT verification
 * - Add Aadhaar eKYC / DigiLocker integration
 * - Support wallet-based auth (signed messages)
 */
export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No authentication token provided" });
    }

    try {
        // TODO: Verify JWT token
        // const decoded = jwt.verify(token, config.jwtSecret);
        // req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
