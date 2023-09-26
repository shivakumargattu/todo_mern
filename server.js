// Import necessary modules and packages
const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("./model"); // Import your MongoDB schema definition
const cors = require("cors");

// Create an Express application
const app = express();
app.use(express.json()); // Enable JSON request parsing

// Enable CORS for all origins (use '*' for development; restrict in production)
app.use(cors({
    origin: "*"
}));

// Connect to MongoDB database hosted on MongoDB Atlas
mongoose.connect("mongodb+srv://gshiva0018:gshiva0018@cluster0.rnm60yk.mongodb.net/?retryWrites=true&w=majority").then(
    () => console.log("Database is connected")
);

// Define a route for adding a new task (HTTP POST)
app.post("/addtask", async (req, res) => {
    const { todo } = req.body; // Extract the 'todo' property from the request body
    try {
        // Create a new task instance based on the TaskSchema definition
        const newData = new TaskSchema({
            todo: todo
        });

        // Save the new task to the database
        await newData.save();

        // Return all tasks from the database as a JSON response
        return res.json(await TaskSchema.find());
    } catch (error) {
        console.error(error);
    }
});

// Define a route for retrieving all tasks (HTTP GET)
app.get("/gettask", async (req, res) => {
    try {
        // Query the database to retrieve all tasks and return them as a JSON response
        return res.json(await TaskSchema.find());
    } catch (error) {
        console.error(error);
    }
});

// Define a route for deleting a task by ID (HTTP DELETE)
app.delete("/delete/:id", async (req, res) => {
    try {
        // Find and delete a task in the database by its ID provided in the URL
        await TaskSchema.findByIdAndDelete(req.params.id);

        // Return all remaining tasks from the database as a JSON response
        return res.json(await TaskSchema.find());
    } catch (error) {
        console.error(error);
    }
});

// Start the Express server on port 5000 and log a message when the server is running
app.listen(5000, () => console.log("Server is running on port 5000"));
