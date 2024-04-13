export const Input = ({
  type,
  icon,
  value,
  onChange,
  placeholder,
  required,
  name,
  className,
}) => {
  return (
    <div className="flex items-center bg-gray-200 h-16 px-4 rounded">
      {icon && <img src={icon} alt="" className="mr-3" />}
      <input
        className={`h-10 bg-transparent text-gray-600 text-xl outline-none ${className}`}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required ? true : false}
      />
    </div>
  );
};
