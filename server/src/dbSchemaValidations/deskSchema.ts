export const deskJsonSchema = {
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
