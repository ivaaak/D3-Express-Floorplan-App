export const reservationJsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["deskId", "date"],
        additionalProperties: false,
        properties: {
            _id: {},
            deskId: {
                bsonType: "objectId",
                description: "'deskId' is required and is an ObjectId",
            },
            date: {
                bsonType: "string",
                description: "'date' is required and is a string representing a date",
            },
            employeeId: {
                bsonType: "objectId",
                description: "'employeeId' is optional and is an ObjectId",
            },
            deskOverlays: {
                bsonType: "object",
                description: "'deskOverlays' is optional and is an object containing polygons",
                properties: {
                    polygons: {
                        bsonType: "array",
                        description: "'polygons' is an array of Polygon objects",
                        items: {
                            bsonType: "object",
                            properties: {
                                id: {
                                    bsonType: "string",
                                    description: "'id' is a string representing the polygon's unique identifier",
                                },
                                name: {
                                    bsonType: "string",
                                    description: "'name' is a string representing the polygon's name",
                                },
                                points: {
                                    bsonType: "array",
                                    description: "'points' is an array of Point objects representing the polygon's vertices",
                                    items: {
                                        bsonType: "object",
                                        properties: {
                                            x: {
                                                // Removed bsonType to allow any number type
                                                description: "'x' is a double representing the x-coordinate of a point",
                                            },
                                            y: {
                                                // Removed bsonType to allow any number type
                                                description: "'y' is a double representing the y-coordinate of a point",
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
