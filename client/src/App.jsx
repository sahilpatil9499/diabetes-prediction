import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage, Signup, Login, DiabetesPredictionForm } from "./screens";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<DiabetesPredictionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
