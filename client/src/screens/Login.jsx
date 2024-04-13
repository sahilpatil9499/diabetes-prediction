import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { Button, Input } from "../components";

const Login = () => {
  const [text, settext] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSignup = async () => {
    try {
      const response = await axios.post("http://localhost:6001/login", {
        email,
        password,
      });
      navigate("/form");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-gray-50 max-w-xl flex flex-col justify-center items-center p-20 rounded-xl">
        <div className="flex flex-col items-center w-100 gap-4">
          <div className="text-violet-600 text-5xl font-bold">{text}</div>
          <div className="bg-violet-600 w-12 h-1 rounded-xl"></div>
        </div>
        <div className="flex flex-col gap-5 mt-4">
          <Input
            icon={email_icon}
            placeholder={"Email ID"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={password_icon}
            placeholder="Password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="forget-password">
          Lost Password? <span>Click Here!</span>
        </div>
        <div className="mx-auto mt-5 flex flex-row gap-3">
          <Button text={"Login"} onClick={handleLoginSignup} isGray={false} />
          <Button
            text={"Sign Up"}
            onClick={() => {
              navigate("/signup");
            }}
            isGray={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
