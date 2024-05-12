import { twMerge } from "tailwind-merge";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder, id, label, className, error, ...rest }) => {
  const [inputType, setInputType] = useState("password");

  const toggleInput = () => {
    if (inputType === "password") setInputType("text");
    else setInputType("password");
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div className="w-full relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          className={twMerge(
            `w-full px-5 py-3 bg-gray-100 rounded-lg border ${ error ? "border-red-500": "border-gray-300" } outline-none text-sm font-normal`,
            className
          )}
          placeholder={placeholder}
          aria-labelledby={id}
          aria-placeholder={placeholder}
          {...rest}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <button type="button" onClick={toggleInput} className="inline-flex items-center">
            {inputType === "password" ? <FaEye size={19}/> : <FaEyeSlash size={19}/>}
          </button>
        </div>
      </div>
      {error && (
        <div className='flex items-center'>
          <span className='text-sm text-red-500 font-medium'>{ error }</span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
