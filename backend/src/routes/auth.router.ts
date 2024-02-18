import express from 'express';
import { customerLogin, customerRegister, logout, staffLogin } from '../controllers/auth.controller';

const route = express.Router();

route.post('/staff/login', staffLogin);

route.post('/customer/register', customerRegister);
route.post('/customer/login', customerLogin);

route.post('/logout', logout);

export default route;
