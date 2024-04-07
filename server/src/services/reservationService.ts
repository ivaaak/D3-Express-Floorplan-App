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


// GET /api/reservations/:date
reservationService.get('/:date', async (req, res) => {
    try {
        console.log("reservationService / GET by date called");
        const { date } = req.params;
        // Parse the date string into a Date object
        const dateObject = new Date(date);

        // Format the date to a string that MongoDB can understand for comparison
        const formattedDate = dateObject.toISOString().split('T')[0]; // This will give us the date in YYYY-MM-DD format

        // Find reservations for the exact date
        const reservations = await collections.reservations?.find({
            date: formattedDate
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


// // PUT /api/reservations/:id
// reservationService.put('/:id', async (req, res) => {
//     try {
//         console.log("reservationService / PUT called");
//         const { id } = req.params;
//         const update = req.body;
//         const result = await collections.reservations?.updateOne({ _id: new ObjectId(id) }, { $set: update });
//         if (result && result.matchedCount === 0) {
//             return res.status(404).json({ message: "Reservation not found" });
//         }
//         res.json({ message: "Reservation updated successfully" });
//     } catch (error) {
//         console.error("Error updating reservation:", error);
//         res.status(500).json({ message: "Error updating reservation" });
//     }
// });


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


// // PUT /api/reservations/add-desk
reservationService.put('/add-desk', async (req, res) => {
    try {
        console.log("reservationService/add-desk / PUT called");
        const { date, deskId, employeeId } = req.body;

        // Attempt to find an existing reservation by date
        const existingReservation = await collections.reservations?.findOne({ date });
        console.log("existingReservation", existingReservation);

        if (existingReservation) {
            // If a reservation exists, update it
            const updateResult = await collections.reservations?.updateOne(
                { _id: existingReservation._id },
                { $push: { deskIds: deskId } }
            );

            if (updateResult && updateResult.matchedCount === 0) {
                return res.status(404).json({ message: "Reservation not found for the given date" });
            }

            // Retrieve the updated reservation to return
            const updatedReservation = await collections.reservations?.findOne({ _id: existingReservation._id });
            res.json(updatedReservation);
        } else {
            const newReservation = {
                date,
                deskIds: [deskId],
                employeeId,
            };
            console.log("newReservation", newReservation);
    
            const result = await collections.reservations?.insertOne(newReservation);
            if (!newReservation) {
                return res.status(500).json({ message: "Failed to create new reservation" });
            }

            res.status(201).json(newReservation);
        }
    } catch (error) {
        console.error("Error processing reservation:", error);
        res.status(500).json({ message: "Error processing reservation" });
    }
});

// Export the router
export default reservationService;
