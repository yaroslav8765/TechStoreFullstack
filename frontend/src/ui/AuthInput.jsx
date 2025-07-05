
import Password from "antd/es/input/Password";
import React from "react";

const AuthInput = ({ label, placeholder, value, onChange, name, errorMessage, isInputHidden, isNewPassword, isBig }) => {
  return (
    <div className="flex flex-col mx-6 mt-4">
            <p className="text-lg text-gray-600">{label}</p>
      {isBig
      ?
      <textarea
        className={`bg-gray-50 h-48 rounded-md border border-gray-500 pl-2 
             focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-lg`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        type={isInputHidden ? "password" : "text"}
        autoComplete={`${isNewPassword === "Yes" ? "new-password" : ''}`}
      />
      
      :
      <input
        className={`bg-gray-50 h-[35px] rounded-md border border-gray-500 pl-2 
             focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-lg`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        type={isInputHidden ? "password" : "text"}
        autoComplete={`${isNewPassword === "Yes" ? "new-password" : ''}`}

      />}

      <p className="text-md text-red-600">{errorMessage}</p>

    </div>
  );
};

export default AuthInput;
