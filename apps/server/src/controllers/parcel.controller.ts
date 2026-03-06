import { Request, Response, NextFunction } from "express";

/**
 * Parcel controller — handles HTTP request/response for parcel operations.
 *
 * TODO:
 * - Inject ParcelService for actual business logic
 * - Add request validation (zod or joi)
 * - Implement pagination for list endpoint
 */
export class ParcelController {
    /**
     * GET /api/parcels
     */
    list = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            // TODO: Replace with service call
            res.json({
                data: [],
                message: "Parcel list — not yet implemented",
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/parcels/:id
     */
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // TODO: Replace with service call
            res.json({
                data: null,
                message: `Parcel ${id} — not yet implemented`,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /api/parcels
     */
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { polygon, location, ownerAddress } = req.body;
            // TODO: Validate input, convert polygon to geohashes, store in DB, mint NFT
            res.status(201).json({
                data: { polygon, location, ownerAddress },
                message: "Parcel creation — not yet implemented",
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /api/parcels/:id/transfer
     */
    transfer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { newOwner } = req.body;
            // TODO: Validate ownership, execute on-chain transfer
            res.json({
                data: { id, newOwner },
                message: "Parcel transfer — not yet implemented",
            });
        } catch (error) {
            next(error);
        }
    };
}
