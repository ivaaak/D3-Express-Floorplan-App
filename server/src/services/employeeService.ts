import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections
import { ObjectId } from 'mongodb';
const employeeService = express.Router();

// GET /api/employees/
employeeService.get('/', async (req, res) => {
    console.log("employeesService / GET /api/employees/ called");
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

// POST /api/employees/
employeeService.post('/', async (req, res) => {
    console.log("employeesService / POST /api/employees/ called");
    try {
        const newEmployee = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
            officeId: req.body.officeId,
        };
        if (!collections.employees) {
            return res.status(500).send('Employees collection not found');
        }
        const result = await collections.employees.insertOne(newEmployee);
        if (!result) {
            return res.status(500).send('Error inserting employee');
        }
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        if (process.env.NODE_ENV === 'development') {
            const err = error as Error;
            res.status(500).send(`Error creating employee: ${err.message}`);
        } else {
            res.status(500).send('Error creating employee');
        }
    }
});

// PUT /api/employees/id
employeeService.put('/:id', async (req, res) => {
    console.log("employeesService / PUT /api/employees/:id called");
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

// DELETE /api/employees/id
employeeService.delete('/:id', async (req, res) => {
    console.log("employeesService / DELETE /api/employees/:id called");
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
