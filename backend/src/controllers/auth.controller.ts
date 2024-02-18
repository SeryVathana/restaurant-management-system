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

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('auth-token');
  res.status(200).send({
    message: 'Successfully logged out',
  });
};

export const customerRegister = async (req: Request, res: Response) => {
  const { name, email, phone_number, password } = req.body;

  try {
    const hashedPassword = password && (await bcrypt.hash(password, process.env.BCRYPT_SALT || 10));

    const sql = 'INSERT INTO customers (name, email, phone_number, password) VALUES ($1, $2, $3, $4)';
    const query = await pool.query(sql, [name, email, phone_number, hashedPassword]);

    res.status(201).send({
      message: `Customer with phone number ${phone_number} is successfully registered.`,
    });
  } catch (err: any) {
    console.log(err.code);
    if (err.code === '23505') {
      if (err.detail.includes('email')) {
        return res.status(409).json({
          message: `Customer with email ${email} is already registered.`,
        });
      } else {
        return res.status(409).send({
          message: `Customer with phone number ${phone_number} is already registered.`,
        });
      }
    }

    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const customerLogin = async (req: Request, res: Response) => {
  const { email_phone, password } = req.body;

  try {
    const sql = 'SELECT * FROM customers WHERE email = $1 OR phone_number = $1';
    const query = await pool.query(sql, [email_phone]);
    const customer = query.rows[0];
    const isPassCorrect = customer && (await bcrypt.compare(password, customer.password));

    if (!customer || !isPassCorrect) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    await createLoginSession(req, res, customer.id);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};
