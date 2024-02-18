import { Request, Response } from 'express';
import { pool } from '../database';
import { IRequest } from '../utils/types';

export const getAllOrders = async (req: Request, res: Response) => {
  const { order_status } = req.query;

  try {
    let sql = '';
    let query;

    if (order_status) {
      sql = 'SELECT * FROM orders WHERE order_status = $1 ORDER BY id';
      query = await pool.query(sql, [order_status]);
    } else {
      sql = 'SELECT * FROM orders ORDER BY id';
      query = await pool.query(sql);
    }
    const result = query.rows;
    res.send(result);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sql = 'SELECT * FROM orders WHERE id = $1';
    const query = await pool.query(sql, [id]);
    const result = query.rows[0];

    if (!result) {
      return res.status(404).send({ message: `Order with id ${id} not found` });
    }

    res.send(result);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const getOrderByCustomerId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cusSql = 'SELECT * FROM customers WHERE id = $1';
    const cusQuery = await pool.query(cusSql, [id]);
    const cusResult = cusQuery.rows[0];

    if (!cusResult) {
      return res.status(404).send({ message: `Customer with id ${id} not found` });
    }

    const sql = 'SELECT * FROM orders WHERE customer_id = $1';
    const query = await pool.query(sql, [id]);
    const result = query.rows;

    res.send(result);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const createOrder = async (req: IRequest, res: Response) => {
  //   const { userId } = req.session;

  //   if (!userId) {
  //     return res.status(401).send({ message: 'Unauthorized' });
  //   }

  const { customer_id, location, food } = req.body;

  //   if (customer_id !== userId) {
  //     return res.status(401).send({ message: 'Unauthorized, wrong user id' });
  //   }

  try {
    const orderSql = 'INSERT INTO orders (customer_id, location) VALUES ($1, $2) RETURNING *';
    const orderQuery = await pool.query(orderSql, [customer_id, location]);

    const orderResult = orderQuery.rows[0];

    const orderId = orderResult.id;

    const foodResult = [];
    for (let i = 0; i < food.length; i++) {
      const foodSql = 'INSERT INTO order_foods (order_id, food_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const foodQuery = await pool.query(foodSql, [orderId, food[i].id, food[i].quantity]);
      foodResult.push(foodQuery.rows[0]);
    }

    res.send({ order: orderResult, food: foodResult });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const updateOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { order_status } = req.body;

  try {
    const getSql = 'SELECT * FROM orders WHERE id = $1';
    const getQuery = await pool.query(getSql, [id]);
    const getResult = getQuery.rows[0];

    const sql = 'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *';
    const query = await pool.query(sql, [order_status, id]);
    const result = query.rows[0];

    console.log(result);

    if (!result) {
      return res.status(404).send({ message: `Order with id ${id} not found` });
    }

    res.send(result);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};
