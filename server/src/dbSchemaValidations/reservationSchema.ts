export const reservationJsonSchema = {
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