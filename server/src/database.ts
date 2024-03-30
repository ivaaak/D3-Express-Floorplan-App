import * as mongodb from "mongodb";
import { Employee } from "./models/employee";
import { Office } from "./models/office";
import { Desk } from "./models/desk";
import { Reservation } from "./models/reservation";
import { Floorplan } from "./models/floorplan";
import * as fs from 'fs';

export const collections: {
    employees?: mongodb.Collection<Employee>;
    offices?: mongodb.Collection<Office>;
    desks?: mongodb.Collection<Desk>;
    reservations?: mongodb.Collection<Reservation>;
    floorplans?: mongodb.Collection<Floorplan>; // Add Floorplan to collections
} = {};


export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;

    const officesCollection = db.collection<Office>("offices");
    collections.offices = officesCollection;

    const desksCollection = db.collection<Desk>("desks");
    collections.desks = desksCollection;

    const reservationsCollection = db.collection<Reservation>("reservations");
    collections.reservations = reservationsCollection;
}


// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const employeeJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
    await db.command({
        collMod: "employees",
        validator: employeeJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", { validator: employeeJsonSchema });
        }
    });

    // Schema validation for offices
    const officeJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "imageUrls", "chosenFloorplan"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                imageUrls: {
                    bsonType: "array",
                    description: "'imageUrls' is required and is an array of strings",
                    items: {
                        bsonType: "string",
                    },
                },
                chosenFloorplan: {
                    bsonType: "string",
                    description: "'chosenFloorplan' is required and is a string",
                },
                desks: {
                    bsonType: "array",
                    description: "'desks' is an array of Desk objects",
                },
            },
        },
    };

    // Apply schema validation for each collection
    await db.command({
        collMod: "offices",
        validator: officeJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("offices", { validator: officeJsonSchema });
        }
    });




    // Schema validation for desks
    const deskJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "officeId", "coordinates"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                officeId: {
                    bsonType: "objectId",
                    description: "'officeId' is required and is an ObjectId",
                },
                coordinates: {
                    bsonType: "array",
                    description: "'coordinates' is required and is an array of coordinate pairs",
                    items: {
                        bsonType: "object",
                        required: ["x", "y"],
                        properties: {
                            x: {
                                bsonType: "int",
                                description: "'x' is required and is an integer",
                            },
                            y: {
                                bsonType: "int",
                                description: "'y' is required and is an integer",
                            },
                        },
                    },
                },
            },
        },
    };

    await db.command({
        collMod: "desks",
        validator: deskJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("desks", { validator: deskJsonSchema });
        }
    });





    // Schema validation for reservations
    const reservationJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["deskId", "startDate", "endDate", "employeeId"],
            additionalProperties: false,
            properties: {
                _id: {},
                deskId: {
                    bsonType: "objectId",
                    description: "'deskId' is required and is an ObjectId",
                },
                startDate: {
                    bsonType: "date",
                    description: "'startDate' is required and is a date",
                },
                endDate: {
                    bsonType: "date",
                    description: "'endDate' is required and is a date",
                },
                employeeId: {
                    bsonType: "objectId",
                    description: "'employeeId' is required and is an ObjectId",
                },
            },
        },
    };

    await db.command({
        collMod: "reservations",
        validator: reservationJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("reservations", { validator: reservationJsonSchema });
        }
    });





    // Schema validation for floorplans
    const floorplanJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["data"],
            additionalProperties: false,
            properties: {
                _id: {},
                data: {
                    bsonType: "object",
                    required: ["heatmap", "overlays"],
                    additionalProperties: false,
                    properties: {
                        heatmap: {
                            bsonType: "object",
                            required: ["binSize", "units", "map"],
                            additionalProperties: false,
                            properties: {
                                binSize: {
                                    bsonType: "double",
                                },
                                units: {
                                    bsonType: "string",
                                },
                                map: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "object",
                                        required: ["x", "y"],
                                        additionalProperties: false,
                                        properties: {
                                            x: {
                                                bsonType: "double",
                                            },
                                            y: {
                                                bsonType: "double",
                                            },
                                            value: {
                                                bsonType: "double",
                                            },
                                            points: {
                                                bsonType: "array",
                                                items: {
                                                    bsonType: "object",
                                                    required: ["x", "y"],
                                                    additionalProperties: false,
                                                    properties: {
                                                        x: {
                                                            bsonType: "double",
                                                        },
                                                        y: {
                                                            bsonType: "double",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        overlays: {
                            bsonType: "object",
                            required: ["polygons"],
                            additionalProperties: false,
                            properties: {
                                polygons: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "object",
                                        required: ["id", "name", "points"],
                                        additionalProperties: false,
                                        properties: {
                                            id: {
                                                bsonType: "string",
                                            },
                                            name: {
                                                bsonType: "string",
                                            },
                                            points: {
                                                bsonType: "array",
                                                items: {
                                                    bsonType: "object",
                                                    required: ["x", "y"],
                                                    additionalProperties: false,
                                                    properties: {
                                                        x: {
                                                            bsonType: "double",
                                                        },
                                                        y: {
                                                            bsonType: "double",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
    await db.command({
        collMod: "floorplans",
        validator: floorplanJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("floorplans", { validator: floorplanJsonSchema });
        }
    });
}


export async function migrateFloorplanData() {
    try {
        // Read the JSON file
        const data = fs.readFileSync('data.json', 'utf8');
        const floorplanData: Floorplan = JSON.parse(data);

        // Prepare the data to match the Floorplan model
        // Adjust the structure to match the Floorplan model directly
        const floorplan: Floorplan = {
            heatmap: floorplanData.heatmap,
            overlays: floorplanData.overlays,
        };

        // Insert the data into the floorplans collection
        if (collections.floorplans) {
            await collections.floorplans.insertOne(floorplan);
            console.log('Floorplan data successfully migrated.');
        } else {
            console.error('Floorplans collection not found.');
        }
    } catch (error) {
        console.error('Error migrating floorplan data:', error);
    }
}


