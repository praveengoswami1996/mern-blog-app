import express from "express";

//Creating an express application/instance
const app = express();

//Port to run our server
const PORT = 5000;

//Handling API Routes
app.get("/", (request, response) => {
    response.send("Hello, API is running");
})

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})