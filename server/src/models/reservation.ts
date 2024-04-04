import * as mongodb from "mongodb";

// Reservation Model
export interface Reservation {
    _id?: mongodb.ObjectId;
    deskId?: mongodb.ObjectId;
    date?: string; // works on a day basis
    officeId?: mongodb.ObjectId;
    employeeId?: mongodb.ObjectId;
    deskIds?: string[];
}


/*
{
    "_id": {
        "$oid": "660ada36efebdef829288d01"
    },
    "deskId": {
        "$oid": "60d5ecb8b392d23410a8b7d1"
    },
    "date": "2023-04-01T09:00:00.000Z",
    "employeeId": {
        "$oid": "65febcaa5f39a20c439ff0ea"
    },
    "officeId": {
        "$oid": "65febcaa5f39a20c439ff0eb"
    },
    "deskIds": [
        "1", "2"
    ]
    
}
*/