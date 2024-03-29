import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from "cors";
import routes from './routes';
import AppError from '@shared/errors/AppError';
import "@shared/infra/typeorm"
import '@shared/container'
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter); // => // middleware para controle de requisições
app.use(pagination) // => midleware para permitir paginação
app.use('/files', express.static(uploadConfig.directory)); // => rota estática para imagens
app.use(routes) // => rotas

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error);


    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
});

app.listen(3333, () => {
    console.log('Server is running on port 3333');
});
