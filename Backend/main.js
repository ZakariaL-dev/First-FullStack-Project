import express from "express";
import path from "path";
// connect DB
import { connectUserDB, connectDemoDB } from "./config/db.js";
// models
import { getDemoModel } from "./models/demo.model.js";
import { getUserModel } from "./models/Auth.model.js";

// --- REQUIRED FOR ES MODULES PATH HANDLING ---
import { fileURLToPath } from "url";
import { dirname } from "path";
// --------------------------------------------

import cookieParser from "cookie-parser";
import router from "./routes/demos.route.js";
import Authrouter from "./routes/Auth.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// home page

// Routes
app.use("/api/demos", router);
app.use("/api", Authrouter);

// --- CORRECT WAY TO DEFINE __dirname IN ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// __dirname is now C:\Users\pc\Desktop\ModelForFullStack\Backend
// -----------------------------------------------------

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
async function startServer() {
  try {
    await connectDemoDB();
    await connectUserDB();
    const User = getUserModel();
    const Demo = getDemoModel();

    app.listen(process.env.Port, () => {
      console.log(`Server is running on http://localhost:${process.env.Port}`);
    });
  } catch (error) {
    console.error(
      "Failed to connect to the database, server not started:",
      error.message
    );
    process.exit(1);
  }
}

// Execute the startup function
startServer();
