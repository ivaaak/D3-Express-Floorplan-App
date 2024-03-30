import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections

const reservationService = express.Router();

// Define your endpoints here
reservationService.get('/', async (req, res) => {
    console.log("reservationService / GET called")
    const employees = await collections.employees?.find().toArray(); // fix undefined??
    res.json(employees);
});

// Export the router
export default reservationService;
