import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections
import { ObjectId } from 'mongodb';

const deskService = express.Router();

// Read all desks
deskService.get('/', async (req, res) => {
    try {
        const desks = await collections.desks?.find().toArray();
        res.json(desks);
    } catch (error) {
        res.status(500).send('Error retrieving desks');
    }
});

// Create a new desk
deskService.post('/', async (req, res) => {
    try {
        const newDesk = req.body;
        console.error("req.body", req.body)
        const result = await collections.desks?.insertOne(newDesk);
        if (result) {
            res.status(201).send(newDesk);
        } else {
            res.status(400).send('Error creating desk');
        }
    } catch (error) {
        res.status(500).send('Error creating desk');
    }
});

// Update a desk by ID
deskService.put('/:id', async (req, res) => {
    try {
        const updatedDesk = req.body;
        // Convert the string ID to an ObjectId
        const id = new ObjectId(req.params.id);
        const result = await collections.desks?.updateOne({ _id: id }, { $set: updatedDesk });
        if (result && result.modifiedCount > 0) {
            res.send(updatedDesk);
        } else {
            res.status(404).send('Desk not found');
        }
    } catch (error) {
        res.status(500).send('Error updating desk');
    }
});

// Delete a desk by ID
deskService.delete('/:id', async (req, res) => {
    try {
        // Convert the string ID to an ObjectId
        const id = new ObjectId(req.params.id);
        const result = await collections.desks?.deleteOne({ _id: id });
        if (result && result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('Desk not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting desk');
    }
});

// Export the router
export default deskService;
