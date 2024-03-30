import * as mongodb from "mongodb";
import { Desk } from "./desk";

// Office Model
export interface Office {
    _id?: mongodb.ObjectId;
    name: string;
    desks: Desk[];
    imageUrls: string[]; // New field for storing image URLs
    chosenFloorplan: string; // New field for the currently chosen floorplan
}
