import { declareAuthRoutes } from './auth';
import { declareSicknessRoutes } from './sickness';
import { declareUserRoutes } from './user';
import express from 'express';

export const router = express.Router();

declareAuthRoutes(router);
declareSicknessRoutes(router);
declareUserRoutes(router);
