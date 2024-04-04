export const deskJsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId",
                description: "'_id' is an optional ObjectId",
            },
            name: {
                bsonType: "string",
                description: "'name' is an optional string",
            },
            officeId: {
                bsonType: "objectId",
                description: "'officeId' is an optional ObjectId",
            },
            coordinates: {
                bsonType: "object",
                description: "'coordinates' is an optional object containing polygons",
                properties: {
                    polygons: {
                        bsonType: "array",
                        description: "'polygons' is an optional array of Polygon objects",
                        items: {
                            bsonType: "object",
                            properties: {
                                id: {
                                    bsonType: "string",
                                    description: "'id' is an optional string",
                                },
                                name: {
                                    bsonType: "string",
                                    description: "'name' is an optional string",
                                },
                                points: {
                                    bsonType: "array",
                                    description: "'points' is an optional array of Point objects",
                                    items: {
                                        bsonType: "object",
                                        properties: {
                                            x: {
                                                //bsonType: "double",
                                                description: "'x' is an optional double",
                                            },
                                            y: {
                                                //bsonType: "double",
                                                description: "'y' is an optional double",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            areas: {
                bsonType: "object",
                description: "'areas' is an optional object containing a heatmap",
                properties: {
                    binSize: {
                        bsonType: "int",
                        description: "'binSize' is an optional integer",
                    },
                    units: {
                        bsonType: "string",
                        description: "'units' is an optional string",
                    },
                    map: {
                        bsonType: "array",
                        description: "'map' is an optional array of HeatmapMapItem objects",
                        items: {
                            bsonType: "object",
                            properties: {
                                x: {
                                    //bsonType: "double",
                                    description: "'x' is an optional double",
                                },
                                y: {
                                    //bsonType: "double",
                                    description: "'y' is an optional double",
                                },
                                value: {
                                    //bsonType: "double",
                                    description: "'value' is required and is an double",
                                },
                                points: {
                                    bsonType: "array",
                                    description: "'points' is an optional array of Point objects",
                                    items: {
                                        bsonType: "object",
                                        properties: {
                                            x: {
                                                //bsonType: "double",
                                                description: "'x' is an optional double",
                                            },
                                            y: {
                                                //bsonType: "double",
                                                description: "'y' is an optional double",
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