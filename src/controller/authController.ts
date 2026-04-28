import { asyncHandler } from "../middleware/asyncHandler.js";
import { UserRepository } from "../repository/userRepository.js";
import { AuthService } from "../service/authService.js";
import type { CookieOptions, Request, Response } from "express";
import bcrypt from "bcrypt"
import { successResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
import { AccessToken } from "../utils/token.js";
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
    const { accessToken, refreshToken, user } = await authService.login(email, password);
    const isProd = process.env.NODE_ENV === "production"
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict"
    }
    const response = res.cookie("accesstoken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
    })
    if (refreshToken) {
        response.cookie("refreshToken", refreshToken, {
            ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000,
        })
    }
    // res.cookie("accessToken", accessToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //     maxAge: 15 * 60 * 1000
    // });
    // res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // });
    const data = { accessToken, user };
    return successResponse(response, "Login successfull", data, 200);
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
    const isProd = process.env.NODE_ENV === "production"
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict"
    }
    return res
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json({ message: "Logged out successfully" })

    // res.clearCookie("accessToken", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    // });
    // res.clearCookie("refreshToken", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    // });
    // return successResponse(res, "Logged out successfully", null, 200);
});
export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }

    try {
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET as string
        );

        const user: any = await userRepository.findById(decoded.id);

        if (!user || !user.refreshToken) {
            return res.status(403).json({ message: "Invalid session" });
        }

        const isValid = await bcrypt.compare(token, user.refreshToken);

        if (!isValid) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = AccessToken(user);

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        return successResponse(res, "Token refreshed", null, 200);

    } catch {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
});




