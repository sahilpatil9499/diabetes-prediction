import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Label } from "../components";

const DiabetesPredictionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });
  const [diagnosis, setDiagnosis] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [result, setResult] = useState(undefined);

  const handlePrediction = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API endpoint for diabetes prediction
      const {
        gender,
        age,
        hypertension,
        heart_disease,
        smoking_history,
        bmi,
        HbA1c_level,
        blood_glucose_level,
      } = formData;

      const response = await axios.post("http://127.0.0.1:5000/predict", {
        gender,
        age,
        hypertension,
        heart_disease,
        smoking_history,
        bmi,
        HbA1c_level,
        blood_glucose_level,
      });

      console.log("Diabetes Prediction:", response.data);
      setResult(response.data);
      alert(response.data);
    } catch (error) {
      console.error("Error predicting diabetes:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API endpoint for diabetes prediction

      const response = await axios.post("http://127.0.0.1:6001/form_detail", {
        ...formData,
        diagnosis: result,
      });
      alert("Saved");
    } catch (error) {
      console.error("Error predicting diabetes:", error);
    }
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      value: formData.name,
      required: true,
    },
    {
      name: "contact",
      type: "tel",
      value: formData.contact,
      required: true,
    },
    {
      name: "gender",
      type: "text",
      value: formData.Gender,
    },
    {
      name: "age",
      type: "number",
      value: formData.age,
    },
    {
      name: "hypertension",
      type: "number",
      value: formData.hypertension,
    },
    {
      name: "heart_disease",
      type: "number",
      value: formData.heart_disease,
    },
    {
      name: "smoking_history",
      type: "text",
      value: formData.smoking_history,
    },
    {
      name: "bmi",
      type: "number",
      value: formData.bmi,
    },

    {
      name: "HbA1c_level",
      type: "number",
      value: formData.HbA1c_level,
    },
    {
      name: "blood_glucose_level",
      type: "number",
      value: formData.blood_glucose_level,
    },
  ];
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-gray-50 max-w-3xl gap-3 flex flex-col flex-wrap justify-center items-center rounded-xl my-10 p-10"
      >
        {result && (
          <div className="bg-yellow-300 rounded px-5 py-2">{result}</div>
        )}
        <div className="flex flex-row flex-wrap justify-center items-center">
          {inputs?.map((item) => (
            <div className="flex flex-col mx-2 my-1">
              <Label text={item.name} />
              <Input
                placeholder={item.name}
                value={item.value}
                name={item.name}
                type={item.type}
                onChange={handleChange}
                required={item.required}
                className={"text-black"}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 ">
          <Button
            type={"button"}
            text={"Predict"}
            onClick={handlePrediction}
            className={"w-44"}
          />
          <Button
            type={"button"}
            text={"save"}
            onClick={handleSave}
            className={"w-44"}
          />
        </div>
      </form>
    </div>
  );
};

export default DiabetesPredictionForm;
