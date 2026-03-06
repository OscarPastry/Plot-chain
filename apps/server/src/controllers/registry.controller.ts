import { Request, Response, NextFunction } from "express";

/**
 * Registry controller — handles verification and ownership history.
 *
 * TODO:
 * - Query blockchain for on-chain verification
 * - Return ownership transfer history from events
 */
export class RegistryController {
    /**
     * GET /api/registry/verify/:id
     */
    verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // TODO: Verify parcel against on-chain data
            res.json({
                valid: false,
                parcelId: id,
                message: "Verification — not yet implemented",
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/registry/history/:id
     */
    history = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // TODO: Fetch transfer events from blockchain
            res.json({
                parcelId: id,
                transfers: [],
                message: "History — not yet implemented",
            });
        } catch (error) {
            next(error);
        }
    };
}
