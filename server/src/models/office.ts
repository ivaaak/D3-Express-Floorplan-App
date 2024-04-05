import * as mongodb from "mongodb";
import { Heatmap, Overlays } from "./floorplan";

// Desk Model
export interface Office {
    _id?: mongodb.ObjectId;
    name?: string;

    imageUrls?: string[];
    chosenFloorplan?: string;

    coordinates?: Overlays; // desk coords
    areas?: Heatmap;
}

/* Example Entity:
{
 "_id": {
    "$oid": "65febcaa5f39a20c439ff0ec"
 },
 "name": "test desk name",
 "officeId": {
    "$oid": "60febcaa5f39a20c439ff0ea"
 },
 "coordinates": {
    "polygons": [
      {
        "id": "polygon1",
        "name": "Example Polygon",
        "points": [
          {
            "x": 12,
            "y": 12
          }
        ]
      }
    ]
 },
 "areas": {
    "binSize": 10,
    "units": "meters",
    "map": [
      {
        "x": 12,
        "y": 12,
        "value": 50,
        "points": [
          {
            "x": 12,
            "y": 12
          }
        ]
      }
    ]
 }
}
*/
