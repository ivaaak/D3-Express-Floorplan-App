import express from 'express';
import { collections } from '../database';
import { Office } from '../models/office';
import * as mongodb from "mongodb";

const officeService = express.Router();

// Get all offices
officeService.get('/', async (req, res) => {
    try {
        const offices = await collections.offices?.find().toArray();
        res.json(offices);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error fetching offices", error: err.message });
    }
});

// Get a specific office by ID
officeService.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const office = await collections.offices?.findOne({ _id: new mongodb.ObjectId(id) });
        if (office) {
            res.json(office);
        } else {
            res.status(404).json({ message: "Office not found" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error fetching office", error: err.message });
    }
});

// Create a new office
officeService.post('/', async (req, res) => {
    const newOffice: Office = req.body;
    try {
        const result = await collections.offices?.insertOne(newOffice);
        if (result) {
            res.status(201).json({ message: "Office created successfully", officeId: result.insertedId });
        } else {
            res.status(500).json({ message: "Error creating office" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error creating office", error: err.message });
    }
});

// Update an office by ID
officeService.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedOffice: Office = req.body;
    try {
        const result = await collections.offices?.updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updatedOffice });
        if (result && result.matchedCount > 0) {
            res.json({ message: "Office updated successfully" });
        } else {
            res.status(404).json({ message: "Office not found" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error updating office", error: err.message });
    }
});

// Delete an office by ID
officeService.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await collections.offices?.deleteOne({ _id: new mongodb.ObjectId(id) });
        if (result && result.deletedCount > 0) {
            res.json({ message: "Office deleted successfully" });
        } else {
            res.status(404).json({ message: "Office not found" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error deleting office", error: err.message });
    }
});

// Export the router
export default officeService;
