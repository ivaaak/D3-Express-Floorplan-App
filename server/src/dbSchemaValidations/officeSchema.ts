export const officeJsonSchema = {
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