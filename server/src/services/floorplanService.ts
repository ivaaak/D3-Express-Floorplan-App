import express, { Request, Response } from 'express';
import { collections } from '../database'; // Assuming you have a database module that exports collections
import { Point, Polygon } from '../models/floorplan';

const floorplanService = express.Router();

// Define your endpoints here
floorplanService.get('/', async (req, res) => {
   try {
       const floorplans = await collections.floorplans?.find().toArray();
       res.json(floorplans);
   } catch (error) {
       res.status(500).send('Error retrieving floorplans');
   }
});

// Heatmap endpoints
floorplanService.get('/heatmap', async (req: Request, res: Response) => {
   try {
       const floorplan = await collections.floorplans?.findOne({}, { projection: { heatmap: 1, _id: 0 } });
       res.json(floorplan?.heatmap);
   } catch (error) {
       res.status(500).send('Error retrieving heatmap');
   }
});

floorplanService.post('/heatmap', async (req: Request, res: Response) => {
   try {
       const newPoint: Point = req.body;
       const result = await collections.floorplans?.updateOne({}, { $push: { 'heatmap.map': newPoint } });
       if (result && result?.modifiedCount > 0) {
           res.status(201).send(newPoint);
       } else {
           res.status(404).send('Floorplan not found');
       }
   } catch (error) {
       res.status(500).send('Error adding point to heatmap');
   }
});

floorplanService.put('/heatmap/:id', async (req: Request, res: Response) => {
   try {
       const updatedPoint: Point = req.body;
       const result = await collections.floorplans?.updateOne({ 'heatmap.map.x': parseInt(req.params.id) }, { $set: { 'heatmap.map.$': updatedPoint } });
       if (result && result?.modifiedCount > 0) {
           res.send(updatedPoint);
       } else {
           res.status(404).send('Point not found');
       }
   } catch (error) {
       res.status(500).send('Error updating point in heatmap');
   }
});

floorplanService.delete('/heatmap/:id', async (req: Request, res: Response) => {
   try {
       const result = await collections.floorplans?.updateOne({}, { $pull: { 'heatmap.map': { x: parseInt(req.params.id) } } });
       if (result && result?.modifiedCount > 0) {
           res.status(204).send();
       } else {
           res.status(404).send('Point not found');
       }
   } catch (error) {
       res.status(500).send('Error deleting point from heatmap');
   }
});

// Overlays endpoints
floorplanService.get('/overlays', async (req: Request, res: Response) => {
   try {
       const floorplan = await collections.floorplans?.findOne({}, { projection: { overlays: 1, _id: 0 } });
       res.json(floorplan?.overlays);
   } catch (error) {
       res.status(500).send('Error retrieving overlays');
   }
});

floorplanService.post('/overlays', async (req: Request, res: Response) => {
   try {
       const newPolygon: Polygon = req.body;
       const result = await collections.floorplans?.updateOne({}, { $push: { 'overlays.polygons': newPolygon } });
       if (result && result?.modifiedCount > 0) {
           res.status(201).send(newPolygon);
       } else {
           res.status(404).send('Floorplan not found');
       }
   } catch (error) {
       res.status(500).send('Error adding polygon to overlays');
   }
});

floorplanService.put('/overlays/:id', async (req: Request, res: Response) => {
   try {
       const updatedPolygon: Polygon = req.body;
       const result = await collections.floorplans?.updateOne({ 'overlays.polygons.id': req.params.id }, { $set: { 'overlays.polygons.$': updatedPolygon } });
       if (result && result?.modifiedCount > 0) {
           res.send(updatedPolygon);
       } else {
           res.status(404).send('Polygon not found');
       }
   } catch (error) {
       res.status(500).send('Error updating polygon in overlays');
   }
});

floorplanService.delete('/overlays/:id', async (req: Request, res: Response) => {
   try {
       const result = await collections.floorplans?.updateOne({}, { $pull: { 'overlays.polygons': { id: req.params.id } } });
       if (result && result?.modifiedCount > 0) {
           res.status(204).send();
       } else {
           res.status(404).send('Polygon not found');
       }
   } catch (error) {
       res.status(500).send('Error deleting polygon from overlays');
   }
});

// Export the router
export default floorplanService;
