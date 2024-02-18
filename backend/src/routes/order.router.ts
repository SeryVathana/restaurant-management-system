import express from 'express';
import { createOrder, getAllOrders, getOrderByCustomerId, getOrderById, updateOrderById } from '../controllers/order.controller';
import { checkLogin } from '../middlewares/auth.middleware';

const route = express.Router();

route.get('/', getAllOrders);
route.get('/:id', getOrderById);
route.get('/customer/:id', getOrderByCustomerId);

route.post('/', createOrder);

route.patch('/:id', updateOrderById);

export default route;
