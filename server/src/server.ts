import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeService } from "./employee.service";
import { floorplanService } from "./floorplan.service";

import path from "path";

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
    app.use(cors());
    app.use("/employees", employeeService);

    // // Use the middleware to inject the service into your routes
    // app.use('/floorplan', floorplanService, (req, res) => {
    //   // Access the service methods from the request object
    //   const heatmap = req.service.getHeatmap();
    //   const overlays = req.service.getOverlays();
    
    //   // Example route handler
    //   res.json({ heatmap, overlays });
    // });

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));
