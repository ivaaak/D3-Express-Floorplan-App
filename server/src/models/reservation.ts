import * as mongodb from "mongodb";

// Reservation Model
export interface Reservation {
    _id?: mongodb.ObjectId;
    deskId: mongodb.ObjectId;
    startDate: Date;
    endDate: Date;
    employeeId: mongodb.ObjectId;
}