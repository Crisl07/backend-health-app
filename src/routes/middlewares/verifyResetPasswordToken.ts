import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyResetPasswordToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.token) return res.status(403).send('Token is required');
  let token = req.body.token;

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(404).send('Time expired');
    req['user'] = decoded['user'];
    next();
  });
};
