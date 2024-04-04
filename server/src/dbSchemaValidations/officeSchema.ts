export const officeJsonSchema = {
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
                description: "'name' is optional and is a string",
            },
            imageUrls: {
                bsonType: "array",
                description: "'imageUrls' is optional and is an array of strings",
                items: {
                    bsonType: "string",
                },
            },
            chosenFloorplan: {
                bsonType: "string",
                description: "'chosenFloorplan' is optional and is a string",
            }
        },
    },
};