export const Button = ({ isGray, text, onClick, className, type }) => {
  return (
    <button
      className={`flex justify-center items-center w-220 h-59  rounded-3xl  text-lg font-bold cursor-pointer px-10 py-2  ${
        isGray ? "bg-gray-200 text-gray-600 " : "text-white bg-purple-600"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
