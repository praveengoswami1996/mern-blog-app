import express, { json } from "express";
import dotenv from "dotenv";
import connectWithDB from "./configs/dbConfig.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

//Configuring dotenv so that we can access environment variables
dotenv.config();

//Connection with MongoDB
connectWithDB();

//Creating an express application/instance
const app = express();

//Port to run our server
const PORT = process.env.PORT || 5000;

/* Necessary Middleware Setup for an express application to work */

app.use(express.json()); //you're telling Express to use this middleware for all incoming requests to your server.

/*
    app.use(express.json()) is a middleware in express js that parses incoming JSON Payloads. When a request is made to your express server with a JSON Payload in the request body, express.json() middleware intercepts that request and parses the JSON data into an Javascript Object, and make it available in req.body for your route handlers.

    After parsing the JSON payload, express.json() calls the next() function, allowing the request to continue to the next middleware function in the chain.
*/


//Handling API Routes
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes)

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})