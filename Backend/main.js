import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
// --- REQUIRED FOR ES MODULES PATH HANDLING ---
import { fileURLToPath } from "url";
import { dirname } from "path";
// --------------------------------------------

import router from "./routes/demos.route.js";

const app = express();

// --- CORRECT WAY TO DEFINE __dirname IN ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// __dirname is now C:\Users\pc\Desktop\ModelForFullStack\Backend
// -----------------------------------------------------

app.use(express.json());

// home page

// Routes
app.use("/api/demos", router);

if (process.env.NODE_ENV === "production") {
  const pathToDist = path.join(__dirname, "..", "Frontend", "dist");

  app.use(express.static(pathToDist));

  app.get(/\/.*/, (req, res) => {
    res.sendFile(path.join(pathToDist, "index.html"));
  });
}

app.get("/", (req, res) => {
  res.status(200).send("Hello Full Stack");
});

// app listener
connectDB()
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log(`Server is running on http://localhost:${process.env.Port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to connect to the database, server not started:",
      error.message
    );
  });
