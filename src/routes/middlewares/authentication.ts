import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(403).send("The authorization header is required");
  let token = req.get("Authorization").split(" ")[1];

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err.message);
    req['user'] = decoded['user'];
    next();
  });
}