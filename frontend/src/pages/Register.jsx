import React, { useState} from "react";
import { passwordStrength } from "check-password-strength";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  // State to handle form data
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordLevel, setPasswordLevel] = useState("");
  const navigate = useNavigate();
  // Form validation
  const validateForm = () => {
    const validationErrors = {};

    // Username validation: not null or empty
    if (!userName.trim()) {
      validationErrors.userName = "Username cannot be empty";
    }

    // Password validation: strong password
    if (passwordLevel !== "Strong") {
      validationErrors.password =
        "Password must be 10+ characters long, include an uppercase letter, a number, and a symbol";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data before submitting
    if (!validateForm()) {
      return;
    }

    const formData = {
      userName,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      navigate("/login");
      toast.success(response?.data?.message);
    } catch (err) {
      toast.error(err);
    }
  };

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    setPasswordLevel(passwordStrength(password).value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-2">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 ${
                errors.userName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your username"
              required
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-2">{errors.userName}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter a strong password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">{errors.password}</p>
            )}

            <div className="mt-2">
              {passwordLevel && (
                <p className="text-sm text-gray-600">
                  Password strength:{" "}
                  <span
                    className={`font-bold  ${
                      passwordLevel === "Strong "
                        ? "text-green-600"
                        : passwordLevel === "Medium"
                        ? "text-yellow-600"
                        : passwordLevel === "Weak"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {passwordLevel}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500  mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
