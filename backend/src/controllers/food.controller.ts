import { Request, Response } from 'express';
import { pool } from '../database';

export const getAllFoods = async (req: Request, res: Response) => {
  const { categoryId } = req.query;
  let query = 'SELECT * FROM foods';

  if (categoryId) {
    query += ` WHERE category_id = ${categoryId}`;
  }

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving foods');
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'SELECT * FROM foods WHERE id = $1';

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).send({ message: `Food with id ${id} not found` });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving food');
  }
};

export const addNewFood = async (req: Request, res: Response) => {
  const { name, category_id, img_url } = req.body;

  if (!name || !category_id) {
    return res.status(400).send('Required fields are missing');
  }

  const query = 'INSERT INTO foods (name, category_id, img_url) VALUES ($1, $2, $3) RETURNING *';

  try {
    const result = await pool.query(query, [name, category_id, img_url || null]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding food');
  }
};

export const deleteFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getQuery = 'SELECT * FROM foods WHERE id = $1';
    const result = await pool.query(getQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `Food with id ${id} not found` });
    }

    const deleteQuery = 'DELETE FROM foods WHERE id = $1';
    await pool.query(deleteQuery, [id]);

    return res.status(200).send({ message: 'food deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting food');
  }
};

export const updateFoodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category_id, img_url } = req.body;

    // if (!name || typeof name !== 'string') {
    //   return res.status(400).send('Invalid name provided');
    // }

    // if (category_id && typeof category_id !== 'number') {
    //   return res.status(400).send('Invalid category_id provided');
    // }

    // if (img_url && typeof img_url !== 'string') {
    //   return res.status(400).send('Invalid img_url provided');
    // }

    // Check if food exists (adjust error message)
    const foodSql = 'SELECT * FROM foods WHERE id = $1';
    const foodQuery = await pool.query(foodSql, [id]);
    const foodData = foodQuery.rows[0];

    if (!foodData) {
      return res.status(404).send(`Food with id ${id} not found`);
    }

    // Construct update object (consider using a more robust method)
    const newData = {
      name: name || foodData.name,
      category_id: category_id || foodData.category_id,
      img_url: img_url || foodData.img_url,
    };

    // Create the UPDATE query (use parameterized queries, consider prepared statements)
    const updateSql = `
        UPDATE foods
        SET name = $1,
            category_id = $2,
            img_url = $3
        WHERE id = $4 RETURNING *
      `;

    // Execute the UPDATE query
    const updateQuery = await pool.query(updateSql, [newData.name, newData.category_id, newData.img_url, id]);

    const updateResult = updateQuery.rows[0];
    // Success response
    res.send(updateResult);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
};
