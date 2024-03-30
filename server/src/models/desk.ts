import * as mongodb from "mongodb";

// Desk Model
export interface Desk {
    _id?: mongodb.ObjectId;
    name: string;
    officeId: mongodb.ObjectId;
    coordinates: { x: number; y: number }[]; // Updated to include an array of coordinate pairs
}
