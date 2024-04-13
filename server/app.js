const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 6001;
const User = require("./model/user");
const DiabetesPrediction = require("./model/prediction.js");

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to enable Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Define your MongoDB models and schemas here if needed
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, this is your Express server!");
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Simulate database check (replace this with actual database logic)
    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Simulate database check (replace this with actual database logic)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // Simulate user creation (replace this with actual database logic)
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.json({ message: "Signup successful" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to handle creating diabetes predictions
app.post("/form_detail", async (req, res) => {
  try {
    // Extract data from the request body
    let {
      name,
      contact,
      age,
      gender,
      heart_disease,
      bmi,
      blood_glucose_level,
      bloodpressure,
      hypertension,
      HbA1c_level,
      smoking_history,
      diagnosis,
    } = req.body;

    age = parseInt(age);
    heart_disease = parseInt(heart_disease);
    bmi = parseInt(bmi);
    blood_glucose_level = parseInt(blood_glucose_level);
    bloodpressure = parseInt(bloodpressure);
    hypertension = parseInt(hypertension);
    HbA1c_level = parseInt(HbA1c_level);

    // Create a new DiabetesPrediction instance using the Mongoose model
    const newDiabetesPrediction = new DiabetesPrediction({
      name,
      contact,
      age,
      gender,
      heart_disease,
      bmi,
      blood_glucose_level,
      bloodpressure,
      hypertension,
      HbA1c_level,
      smoking_history,
      diagnosis,
    });

    // Save the new prediction to the database
    const savedPrediction = await newDiabetesPrediction.save();

    res.json({
      message: "Diabetes prediction saved successfully",
      prediction: savedPrediction,
    });
  } catch (error) {
    console.error("Error creating diabetes prediction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
