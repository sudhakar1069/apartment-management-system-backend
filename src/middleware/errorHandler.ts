import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";

export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
return errorResponse(res,err.message||"internal server error",err,err.status||500)
};
