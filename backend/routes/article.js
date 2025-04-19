const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");

// Define Mongoose schema for storing articles
const incidentSchema = new mongoose.Schema({
    name: String,
    description: String,
    timestamp: Date,
    relationship: String,
    emotionalState: String,
    repeatBehavior: Boolean,
    severityScore: Number,
    recommendation: String,
});

const Incidents = mongoose.model("Incidents", incidentSchema);

router.post("/send", async (req, res) => {
    const { name, description, relationship, emotionalState, repeatBehavior, severityScore, recommendation } = req.body;
    try {
        const newIncident = new Incidents({
            name,
            description,
            timestamp: new Date(), // Set the timestamp to the current date
            relationship,
            emotionalState,
            repeatBehavior,
            severityScore,
            recommendation,
        });
        await newIncident.save();
        res.status(200).json({ message: "Incident saved successfully" });
    } catch (error) {
        console.error("Error saving incident:", error);
        res.status(500).json({ message: "Error saving incident" });
    }
});

router.get("/get", async (req, res) => {
    try {
        const incidents = await Incidents.find();
        res.status(200).json(incidents);
    } catch (error) {
        console.error("Error fetching incidents:", error);
        res.status(500).json({ message: "Error fetching incidents" });
    }
}
);
module.exports = router;