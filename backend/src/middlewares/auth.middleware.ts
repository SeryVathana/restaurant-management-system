import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IRequest } from '../utils/types';
import jwt from 'jsonwebtoken';

export const checkLogin = (req: IRequest, res: Response, next: NextFunction) => {
  const sessionId = req.cookies['auth-token'];

  jwt.verify(sessionId, 'your-secret-key', (err: any, decode: any) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  });

  if (!sessionId) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  next();
};
