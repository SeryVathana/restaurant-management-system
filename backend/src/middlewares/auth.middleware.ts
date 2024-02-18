import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IRequest } from '../utils/types';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

export const checkLogin = (req: IRequest, res: Response, next: NextFunction) => {
  const sessionId = req.cookies['auth-token'];

  jwt.verify(sessionId, 'your-secret-key', (err: any, decode: any) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    } else {
      req.session = decode;
    }
  });

  if (!sessionId) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  next();
};

export const checkPermission = async (req: IRequest, res: Response, next: NextFunction) => {
  const { userId: id } = req.session;

  try {
    const sql = 'SELECT * FROM staffs WHERE id = $1';
    const query = await pool.query(sql, [id]);
    const staff = query.rows[0];

    if (!staff || staff.role !== 'admin') {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    next();
  } catch (err) {
    console.error('Error executing query: ', err);
    res.status(500).send('Internal Server Error');
  }
};
