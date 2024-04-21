import express from "express";
import dotenv from "dotenv";
import connectWithDB from "./configs/dbConfig.js";
import userRoutes from "./routes/user.routes.js";

//Configuring dotenv so that we can access environment variables
dotenv.config();

//Connection with MongoDB
connectWithDB();

//Creating an express application/instance
const app = express();

//Port to run our server
const PORT = process.env.PORT || 5000;


//Handling API Routes
app.use("/api/users", userRoutes);


//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})