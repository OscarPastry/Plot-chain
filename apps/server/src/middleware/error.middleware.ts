import { Request, Response, NextFunction } from "express";

/**
 * Global error handler middleware.
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error("❌ Error:", err.message);
    console.error(err.stack);

    res.status(500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
}
