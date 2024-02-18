import express from 'express';
import { staffLogin, staffLogout } from '../controllers/auth.controller';

const route = express.Router();

route.post('/staff/', staffLogin);
route.post('/staff/logout', staffLogout);

export default route;
