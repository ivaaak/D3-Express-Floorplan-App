import * as mongodb from "mongodb";
import { Heatmap, Overlays } from "./floorplan";

// Office Model
export interface Office {
    _id?: mongodb.ObjectId;
    name?: string;

    imageUrls?: string[];
    chosenFloorplan?: string;

    coordinates?: Overlays; // desk coords
    areas?: Heatmap;
}
