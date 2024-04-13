import heroImage from "../assets/hero.png";
import { useNavigate } from "react-router-dom";

import { Button } from "../components";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-row items-center h-screen p-20">
      <div className="flex flex-col justify-center">
        <h1 className=" text-5xl font-semibold leading-normal">
          Welcome to Our Diabetes Prediction Website
        </h1>
        <p className="text-justifyf">
          A Web application to check the probability of a patient having
          diabetes
        </p>

        <div className="mt-10 flex justify-start gap-4">
          <Button
            text={"Sign Up"}
            isGray={false}
            onClick={(e) => navigate("/signup")}
          />
          <Button
            text={"Login"}
            isGray={true}
            onClick={() => navigate("/login")}
          />
        </div>
      </div>

      <img src={heroImage} className="w-full xl:w-1/2" />
    </div>
  );
};

export default LandingPage;
