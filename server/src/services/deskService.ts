import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections

const deskService = express.Router();

// Define your endpoints here
deskService.get('/', async (req, res) => {
    const employees = await collections.desks?.find().toArray();
    res.json(employees);
});

// Export the router
export default deskService;