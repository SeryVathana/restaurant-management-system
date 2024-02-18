import { Request, Response } from 'express';
import { pool } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createLoginSession = async (req: Request, res: Response, id: number) => {
  try {
    const token = jwt.sign({ userId: id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.cookie('auth-token', token, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    });

    res.status(200).send({
      message: 'Successfully logged in',
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const staffLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const sql = 'SELECT * FROM staffs WHERE email = $1';
    const query = await pool.query(sql, [email]);
    const staff = query.rows[0];
    const isPassCorrect = staff && (await bcrypt.compare(password, staff.password));

    if (!staff || !isPassCorrect) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    await createLoginSession(req, res, staff.id);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const staffLogout = async (req: Request, res: Response) => {
  res.clearCookie('auth-token');
  res.status(200).send({
    message: 'Successfully logged out',
  });
};
