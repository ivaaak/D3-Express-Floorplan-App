import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections

const employeeService = express.Router();

// Define your endpoints here
employeeService.get('/', async (req, res) => {
    const employees = await collections.employees?.find().toArray(); // fix undefined??
    res.json(employees);
});

// Export the router
export default employeeService;
