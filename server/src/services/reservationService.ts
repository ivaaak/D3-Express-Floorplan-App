import express from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections

const reservationService = express.Router();


// GET /api/reservations/
reservationService.get('/', async (req, res) => {
    console.log("reservationService / GET called")
    const reservations = await collections.reservations?.find().toArray(); // fix undefined??
    res.json(reservations);
});

// POST api/reservations/addPolygon
// Endpoint to add a Polygon to the Overlay object's polygons array
reservationService.post('/addPolygon', async (req, res) => {
    try {
        const selectedDate = req.body.selectedDate;
        const polygon = req.body.polygon;

        // Find the reservation by its startDate
        const reservation = await collections.reservations?.findOne({ date: selectedDate });

        if (!reservation) {
            // If no reservation is found with the given date, return an error
            return res.status(404).json({ 
                message: `Reservation not found for the given date: ${selectedDate}`,
            });
        }

        // Update the deskOverlays.polygons array by adding the new polygon
        const updateResult = await collections.reservations?.updateOne(
            { _id: reservation._id }, // Use the _id of the found reservation
            { $push: { "deskOverlays.polygons": polygon } }
        );

        if (updateResult?.modifiedCount === 0) {
            return res.status(400).json({ message: 'Failed to add polygon' });
        }

        res.status(200).json({ message: 'Polygon added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router
export default reservationService;



// Example Polygon Object:
// {
//     "id": "p2", "name": "desk2",
//     "points": [
//         { "x": 12, "y": 22 },
//         { "x": 12, "y": 24 },
//         { "x": 16, "y": 24 },
//         { "x": 16, "y": 22 }
//     ]
// },
