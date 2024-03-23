import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
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
    app.use("/employees", employeeRouter);

    // // Serve static files from the /client/public directory
    // app.use(express.static(path.join(__dirname, '../../client/public')));

    // Serve static files
    app.use(express.static('public'));

    // Serve JavaScript files with correct MIME type
    app.use((req, res, next) => {
      if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
    app.use((req, res, next) => {
      if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      next();
    });

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));
