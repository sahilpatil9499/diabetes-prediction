import React from "react";

const Label = ({ className, htmlFor, text }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-normal text-xl my-1 ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
