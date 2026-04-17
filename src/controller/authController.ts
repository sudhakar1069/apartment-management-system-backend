import { asyncHandler } from "../middleware/asyncHandler.js";
import { UserRepository } from "../repository/userRepository.js";
import { AuthService } from "../service/authService.js";
import type { Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

// REGISTER
export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    return successResponse(res, "User registration successfull", user, 201)

});

// LOGIN
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });
    return successResponse(res, "Login successfull", tokens, 200);
});
export const me = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }
    try {
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        return successResponse(
            res, "User fetched successfully", {
            id: decoded.id,
            role: decoded.role,
        }, 200);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
});

// LOGOUT
export const logout = asyncHandler(async (req: any, res: Response) => {
    await authService.logout(req.user.id);
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return successResponse(res, "Logged out successfully", null, 200);
});




