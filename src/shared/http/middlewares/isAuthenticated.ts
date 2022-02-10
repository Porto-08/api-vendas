import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import authConfig from "../../../config/auth"
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
    name: string;
    iat: number;
    exp: number;
    sub: string;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.headers.authorization) {
        throw new AppError("Token not provided", 401);

    }

    const [, token] = req.headers.authorization.split(" ");

    if (!token) {
        throw new AppError("Token not provided", 401);
    }

    try {
        const decodedToken = jwt.verify(token, authConfig.jwt.secret);

        const { id } = decodedToken as TokenPayload;

        req.user = {
            id
        }

        return next();
    } catch (err) {
        throw new AppError("Invalid token", 401);
    }
}