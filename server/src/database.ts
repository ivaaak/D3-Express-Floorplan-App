import * as mongodb from "mongodb";
import { employeeJsonSchema } from "./dbSchemaValidations/employeeSchema";
import { officeJsonSchema } from "./dbSchemaValidations/officeSchema";
import { reservationJsonSchema } from "./dbSchemaValidations/reservationSchema";
import { Employee } from "./models/employee";
import { Office } from "./models/office";
import { Reservation } from "./models/reservation";

export const collections: {
    employees?: mongodb.Collection<Employee>;
    offices?: mongodb.Collection<Office>;
    reservations?: mongodb.Collection<Reservation>;
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

    const reservationsCollection = db.collection<Reservation>("reservations");
    collections.reservations = reservationsCollection;
}


// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    // Try applying the modification to the collection, if the collection doesn't exist, create it 
    await db.command({
        collMod: "employees",
        validator: employeeJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", { validator: employeeJsonSchema });
        }
    });


    await db.command({
        collMod: "offices",
        validator: officeJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("offices", { validator: officeJsonSchema });
        }
    });


    await db.command({
        collMod: "reservations",
        validator: reservationJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("reservations", { validator: reservationJsonSchema });
        }
    });
}

/*
export async function migrateFloorplanData() {
    try {
        // Read the JSON file
        const filePath = '../client/src/data/floorplanData.json';
        const data = fs.readFileSync(filePath, 'utf8');
        const floorplanData: Floorplan = JSON.parse(data);

        console.log("floorplanData", JSON.stringify(floorplanData, null, 2));
        // Prepare the data to match the Floorplan model
        // Adjust the structure to match the Floorplan model directly
        const floorplan: Floorplan = {
            heatmap: floorplanData.heatmap,
            overlays: floorplanData.overlays,
        };
        console.log("floorplan", floorplan)

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
*/
