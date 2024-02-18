import express from 'express';
import { addNewStaff, deleteStaffById, getAllStaffs, getStaffById, updateStaffById } from '../controllers/staff.controller';
import { checkLogin, checkPermission } from '../middlewares/auth.middleware';

const route = express.Router();

route.use(checkLogin);
route.use(checkPermission);

route.get('/', getAllStaffs);
route.get('/:id', getStaffById);
route.patch('/:id', updateStaffById);
route.post('/', addNewStaff);
route.delete('/:id', deleteStaffById);

export default route;
