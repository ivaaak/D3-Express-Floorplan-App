import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections
import { ObjectId } from 'mongodb';

const reservationService = express.Router();

// GET /api/reservations/
reservationService.get('/', async (req, res) => {
    try {
        console.log("reservationService / GET called");
        const reservations = await collections.reservations?.find().toArray();
        res.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ message: "Error fetching reservations" });
    }
});

// POST /api/reservations/
reservationService.post('/', async (req, res) => {
    try {
        console.log("reservationService / POST called");
        const newReservation = req.body;
        const result = await collections.reservations?.insertOne(newReservation);
        res.status(201).json(newReservation);
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ message: "Error creating reservation" });
    }
});

// GET /api/reservations/:date
reservationService.get('/:date', async (req, res) => {
    try {
        console.log("reservationService / GET by date called");
        const { date } = req.params;
        // Parse the date string into a Date object
        const dateObject = new Date(date);
        // Start and end of the day for the given date
        const startOfDay = new Date(dateObject.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateObject.setHours(23, 59, 59, 999));

        // Ensure the dates are in a format that MongoDB can understand
        const startOfDayISO = startOfDay.toISOString();
        const endOfDayISO = endOfDay.toISOString();

        // Find reservations within the day
        const reservations = await collections.reservations?.find({
            date: {
                $gte: startOfDayISO,
                $lte: endOfDayISO
            }
        }).toArray();

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "No reservations found for the specified date" });
        }
        res.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations by date:", error);
        res.status(500).json({ message: "Error fetching reservations by date" });
    }
});


// PUT /api/reservations/:id
reservationService.put('/:id', async (req, res) => {
    try {
        console.log("reservationService / PUT called");
        const { id } = req.params;
        const update = req.body;
        const result = await collections.reservations?.updateOne({ _id: new ObjectId(id) }, { $set: update });
        if (result && result.matchedCount === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.json({ message: "Reservation updated successfully" });
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({ message: "Error updating reservation" });
    }
});

// DELETE /api/reservations/:id
reservationService.delete('/:id', async (req, res) => {
    try {
        console.log("reservationService / DELETE called");
        const { id } = req.params;
        const result = await collections.reservations?.deleteOne({ _id: new ObjectId(id) });
        if (result && result.deletedCount === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ message: "Error deleting reservation" });
    }
});

// PATCH /api/reservations/add-desk/:date
reservationService.patch('/add-desk/:date', async (req, res) => {
    try {
        console.log("reservationService / PATCH add-desk called");
        const { date } = req.params;
        const { deskId } = req.body;

        // Find the reservation by date
        const reservation = await collections.reservations?.findOne({ date });
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found for the given date" });
        }

        // Add the new deskId to the reservation's deskIds array
        const updateResult = await collections.reservations?.updateOne(
            { _id: reservation._id },
            { $push: { deskIds: deskId } }
        );

        if (updateResult && updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "Reservation not found for the given date" });
        }

        // Retrieve the updated reservation to return
        const updatedReservation = await collections.reservations?.findOne({ _id: reservation._id });
        res.json(updatedReservation);
    } catch (error) {
        console.error("Error adding desk to reservation:", error);
        res.status(500).json({ message: "Error adding desk to reservation" });
    }
});

// Export the router
export default reservationService;
