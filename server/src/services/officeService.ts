import express from 'express';
import { collections } from '../database';
import * as mongodb from "mongodb";
import { Office } from '../models/office';

const officeService = express.Router();

// GET /api/offices/
officeService.get('/', async (req, res) => {
    try {
        const offices = await collections.offices?.find().toArray();
        res.json(offices);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error fetching offices", error: err.message });
    }
});

// GET /api/offices/id
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

// POST /api/offices/
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

// PUT /api/offices/id
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

// DELETE /api/offices/id
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


// POST /api/desks/update-overlays
officeService.post('/update-overlays', async (req, res) => {
    try {
        const polygons = req.body; // Assuming the request body contains the array of polygon objects

        // Update all desks with the new overlays
        const result = await collections.offices?.updateMany(
            {}, // Match all documents
            { $set: { overlays: polygons } } // Set the overlays field to the new array
        );

        if (result && result.matchedCount > 0) {
            res.status(200).send({ message: "Overlays updated successfully", modifiedCount: result.modifiedCount });
        } else {
            res.status(404).send({ message: "No desks found to update" });
        }
    } catch (error) {
        console.error("Error updating overlays:", error);
        const err = error as Error;
        res.status(500).send({ message: "Error updating overlays", error: err.message });
    }
});

// POST /api/desks/update-areas
officeService.post('/update-areas', async (req, res) => {
    try {
        const heatmap = req.body; // Assuming the request body contains the heatmap object

        // Update all desks with the new areas
        const result = await collections.offices?.updateMany(
            {}, // Match all documents
            { $set: { areas: heatmap } } // Set the areas field to the new heatmap object
        );

        if (result && result.matchedCount > 0) {
            res.status(200).send({ message: "Areas updated successfully", modifiedCount: result.modifiedCount });
        } else {
            res.status(404).send({ message: "No desks found to update" });
        }
    } catch (error) {
        console.error("Error updating areas:", error);
        const err = error as Error;
        res.status(500).send({ message: "Error updating areas", error: err.message });
    }
});


// Export the router
export default officeService;
