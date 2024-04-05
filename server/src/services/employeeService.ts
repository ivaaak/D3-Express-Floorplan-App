import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections
import { ObjectId } from 'mongodb';

const employeeService = express.Router();

// GET /api/employee/
employeeService.get('/', async (req, res) => {
    console.log("employeeService / GET /api/employee/ called");
    try {
        const employees = await collections.employees?.find().toArray();
        if (employees) {
            res.json(employees);
        } else {
            res.status(404).send('No employees found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving employees');
    }
});

// POST /api/employee/
employeeService.post('/', async (req, res) => {
    console.log("employeeService / POST /api/employee/ called");
    try {
        const newEmployee = req.body;
        const result = await collections.employees?.insertOne(newEmployee);
        if (result) {
            res.status(201).send(newEmployee);
        } else {
            res.status(400).send('Error creating employee');
        }
    } catch (error) {
        res.status(500).send('Error creating employee');
    }
});

// PUT /api/employee/id
employeeService.put('/:id', async (req, res) => {
    console.log("employeeService / PUT /api/employee/:id called");
    try {
        const updatedEmployee = req.body;
        const id = new ObjectId(req.params.id);
        const result = await collections.employees?.updateOne({ _id: id }, { $set: updatedEmployee });
        if (result && result.modifiedCount > 0) {
            res.send(updatedEmployee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Error updating employee');
    }
});

// DELETE /api/employee/id
employeeService.delete('/:id', async (req, res) => {
    console.log("employeeService / DELETE /api/employee/:id called");
    try {
        const id = new ObjectId(req.params.id);
        const result = await collections.employees?.deleteOne({ _id: id });
        if (result && result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting employee');
    }
});

// Export the router
export default employeeService;
