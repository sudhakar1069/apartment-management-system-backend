import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { ZodError } from "zod";
import { errorResponse } from "../utils/response.js";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const formattedErrors = err.issues.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                }));
                return errorResponse(res, "invalid credentials", formattedErrors, 400)
            }
        };
    }
}