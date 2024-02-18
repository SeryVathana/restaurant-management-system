import { Request, Response } from 'express';
import { pool } from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const getAllStaffs = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT first_name, last_name, email, role, job_id, shift_id, hire_date FROM staffs order by id ASC';
    const query = await pool.query(sql);
    const data = query.rows;

    res.status(200).send(data);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT id, first_name, last_name, email, role, job_id, shift_id, hire_date FROM staffs WHERE id = $1';
    const query = await pool.query(sql, [id]);
    const data = query.rows[0];

    if (!data) {
      return res.status(404).json({
        message: 'Staff not found',
      });
    }

    res.status(200).send(data);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const addNewStaff = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, job_id, shift_id, salary, hire_date } = req.body;

    const hashedPassword = password && (await bcrypt.hash(password, process.env.BCRYPT_SALT || 10));
    console.log(hashedPassword);

    const sql =
      'INSERT INTO staffs (first_name, last_name, email, password, role, job_id, shift_id, salary, hire_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    await pool.query(sql, [first_name, last_name, email, hashedPassword, 'user', job_id, shift_id, salary, hire_date]);

    res.status(201).send('Staff added successfully');
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const updateStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, job_id, shift_id, salary, hire_date } = req.body;

    const staffSql = 'SELECT * FROM staffs WHERE id = $1';
    const staffQuery = await pool.query(staffSql, [id]);
    const staffData = staffQuery.rows[0];

    if (!staffData) {
      return res.status(404).send(`Staff with id ${id} not found`);
    }

    const newData = [
      first_name || staffData.first_name,
      last_name || staffData.last_name,
      email || staffData.email,
      job_id || staffData.job_id,
      shift_id || staffData.shift_id,
      salary || staffData.salary,
      hire_date || staffData.hire_date,
    ];

    const updateSql =
      'UPDATE staffs SET first_name=$1, last_name=$2, email=$3, job_id=$4, shift_id=$5, salary=$6, hire_date=$7 WHERE id=$8';
    await pool.query(updateSql, [...newData, id]);

    res.send('Update staff');
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sql = 'SELECT * FROM staffs WHERE id = $1';
    const query = await pool.query(sql, [id]);
    const staff = query.rows[0];

    if (!staff) {
      return res.status(404).send({ message: `Staff with id ${id} not found` });
    }

    const deleteSql = 'DELETE FROM staffs WHERE id = $1';
    await pool.query(deleteSql, [id]);

    res.status(200).send({ message: `Staff with id ${id} deleted` });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};
