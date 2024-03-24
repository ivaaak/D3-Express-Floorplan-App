// jsonDataService.ts

import express, { Request, Response } from 'express';
import { JsonData, Point, Polygon } from './floorplan';

const jsonData: JsonData = {
 heatmap: {
    binSize: 1.5,
    units: "\u00B0C",
    map: [
      { x: 2, y: 22, value: 22 },
      // Additional data points...
    ],
 },
 overlays: {
    polygons: [
      { id: "p1", name: "kitchen", points: [
        { x: 1.2, y: 11.0 },
        // Additional points...
      ]},
    ],
 },
};

const app = express();
const port = 3000;

app.use(express.json());

app.get('/heatmap', (req: Request, res: Response) => {
 res.json(jsonData.heatmap);
});

app.post('/heatmap', (req: Request, res: Response) => {
 const newPoint: Point = req.body;
 jsonData.heatmap.map.push(newPoint);
 res.status(201).send(newPoint);
});

app.put('/heatmap/:id', (req: Request, res: Response) => {
 const updatedPoint: Point = req.body;
 const index = jsonData.heatmap.map.findIndex(point => point.x === parseInt(req.params.id));
 if (index !== -1) {
    jsonData.heatmap.map[index] = updatedPoint;
    res.send(updatedPoint);
 } else {
    res.status(404).send('Point not found');
 }
});

app.delete('/heatmap/:id', (req: Request, res: Response) => {
 const index = jsonData.heatmap.map.findIndex(point => point.x === parseInt(req.params.id));
 if (index !== -1) {
    jsonData.heatmap.map.splice(index, 1);
    res.status(204).send();
 } else {
    res.status(404).send('Point not found');
 }
});

app.get('/overlays', (req: Request, res: Response) => {
 res.json(jsonData.overlays);
});

app.post('/overlays', (req: Request, res: Response) => {
 const newPolygon: Polygon = req.body;
 jsonData.overlays.polygons.push(newPolygon);
 res.status(201).send(newPolygon);
});

app.put('/overlays/:id', (req: Request, res: Response) => {
 const updatedPolygon: Polygon = req.body;
 const index = jsonData.overlays.polygons.findIndex(polygon => polygon.id === req.params.id);
 if (index !== -1) {
    jsonData.overlays.polygons[index] = updatedPolygon;
    res.send(updatedPolygon);
 } else {
    res.status(404).send('Polygon not found');
 }
});

app.delete('/overlays/:id', (req: Request, res: Response) => {
 const index = jsonData.overlays.polygons.findIndex(polygon => polygon.id === req.params.id);
 if (index !== -1) {
    jsonData.overlays.polygons.splice(index, 1);
    res.status(204).send();
 } else {
    res.status(404).send('Polygon not found');
 }
});


export const floorplanService = (req: { service: (req: any, res: any, next: any) => void; }, res: any, next: () => void) => {
    req.service = floorplanService;
    next();
};
   
module.exports = floorplanService;
