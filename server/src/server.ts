import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import routes from "./services/routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {

    const app = express();
    const port = 5200;
    
    // Use the routes module
    app.use(cors());
    app.use(express.json()); // For parsing application/json
    app.use('/api', routes); // Prefix all routes with '/api'
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

  })
  .catch((error) => console.error(error));
