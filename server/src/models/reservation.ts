import * as mongodb from "mongodb";
import { Overlays, Polygon } from "./floorplan";

// Reservation Model
export interface Reservation {
    _id?: mongodb.ObjectId;
    deskId: mongodb.ObjectId;
    date: string; // works on a day basis
    employeeId?: mongodb.ObjectId;
    deskOverlays?: Overlays; // polygons which correspond to desk coords
}

export function generateReservationObject(deskId: string, date: string, employeeId: string, polygon: Polygon) {
    const { ObjectId } = require('mongodb');

    const reservation = {
        _id: new ObjectId(),
        deskId: new ObjectId(deskId),
        date: date,
        employeeId: new ObjectId(employeeId),
        deskOverlays: {
            polygons: [
                {
                    id: polygon.id,
                    name: polygon.name,
                    points: [
                        polygon.points
                    ]
                }
            ]
        }
    };
    return reservation;
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
    "deskOverlays": {
        "polygons": [
            {
                "id": "polygon1",
                "name": "Desk Area",
                "points": [
                    {
                        "x": {
                            "$numberDouble": "10.0"
                        },
                        "y": {
                            "$numberDouble": "20.0"
                        }
                    },
                    {
                        "x": {
                            "$numberDouble": "30.0"
                        },
                        "y": {
                            "$numberDouble": "20.0"
                        }
                    },
                    {
                        "x": {
                            "$numberDouble": "30.0"
                        },
                        "y": {
                            "$numberDouble": "40.0"
                        }
                    },
                    {
                        "x": {
                            "$numberDouble": "10.0"
                        },
                        "y": {
                            "$numberDouble": "40.0"
                        }
                    }
                ]
            }
        ]
    }
}
*/