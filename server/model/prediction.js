const mongoose = require("mongoose");

const diabetesPredictionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  hypertension: {
    type: Number,
  },
  heart_disease: {
    type: Number,
  },
  smoking_history: {
    type: String,
    required: true,
  },
  bmi: {
    type: Number,
  },
  HbA1c_level: {
    type: Number,
  },
  blood_glucose_level: {
    type: Number,
  },
  diagnosis: {
    type: String,
    required: true,
  },
});

const DiabetesPrediction = mongoose.model(
  "DiabetesPrediction",
  diabetesPredictionSchema
);

module.exports = DiabetesPrediction;
