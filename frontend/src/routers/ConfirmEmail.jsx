import React from "react";
import { useNavigate } from "react-router-dom";

function ConfirmEmail() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
        <h1 className="text-gray-900 text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="mb-6 text-gray-700">
          We have sent you an email with instructions to activate your account.
          Please follow the link in the email to complete your registration.
        </p>
        <button
          onClick={handleGoHome}
          className="gradient-btn-green hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default ConfirmEmail;
