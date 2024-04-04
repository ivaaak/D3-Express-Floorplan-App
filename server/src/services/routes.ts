import express from 'express';
import employeeService from './employeeService';
import officeService from './officeService';
import deskService from './deskService';
import reservationService from './reservationService';

const router = express.Router();

// Register your services
router.use('/employees', employeeService);
router.use('/offices', officeService);
router.use('/desks', deskService);
router.use('/reservations', reservationService);


export default router;
