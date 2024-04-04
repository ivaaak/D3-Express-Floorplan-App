export const reservationJsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId",
                description: "'_id' is an optional ObjectId"
            },
            deskId: {
                bsonType: "objectId",
                description: "'deskId' is an optional ObjectId"
            },
            date: {
                bsonType: "string",
                description: "'date' is an optional string representing a date"
            },
            officeId: {
                bsonType: "objectId",
                description: "'officeId' is an optional ObjectId"
            },
            employeeId: {
                bsonType: "objectId",
                description: "'employeeId' is an optional ObjectId"
            },
            deskIds: {
                bsonType: "array",
                description: "'deskIds' is an optional array of strings",
                items: {
                    bsonType: "string"
                }
            }
        }
    }
};
