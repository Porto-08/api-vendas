import Redis from 'ioredis';
import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import AppError from "@shared/errors/AppError";

export async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS || undefined,
        });

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: "ratelimit",
            points: 5,
            duration: 1,
        });

        await limiter.consume(req.ip);
        return next();
    } catch (err) {
        throw new AppError("Too many requests", 429);
    }
}



