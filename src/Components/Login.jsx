import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Import your Supabase client
import toast, { Toaster } from "react-hot-toast";
import HOC from "./HOC/HOC";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loginMethod, setLoginMethod] = useState("password"); // State to toggle between password and magic link login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let data, error;

      if (loginMethod === "password") {
        // Supabase authentication with password
        ({ data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        }));
      } else {
        // Supabase authentication with magic link
        ({ data, error } = await supabase.auth.signInWithOtp({
          email,
        }));
      }

      if (error) {
        alert(`Login failed: ${error.message}`);
        toast.error("Login error: " + error.message);
      } else {
        // toast.success("Login successful!");
        // navigate("/add-product"); // Redirect to Add Product page
      }
    } catch (err) {
      toast.error("Unexpected error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-md shadow-md container m-auto max-w-sm mt-12"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Radio buttons for login method */}
        <div className="mb-4">
          <label className="block mb-2">Login Method</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="loginMethod"
                value="password"
                checked={loginMethod === "password"}
                onChange={() => setLoginMethod("password")}
                className="mr-2"
              />
              Password
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="loginMethod"
                value="magicLink"
                checked={loginMethod === "magicLink"}
                onChange={() => setLoginMethod("magicLink")}
                className="mr-2"
              />
              Magic Link
            </label>
          </div>
        </div>

        {/* Password Input (only visible if password login is selected) */}
        {loginMethod === "password" && (
          <div className="mb-4 relative">
            <label className="block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Logging in..."
            : loginMethod === "password"
            ? "Login with Password"
            : "Send Magic Link"}
        </button>
      </form>
      <NavLink to="/forgot-password">Forgot Password?</NavLink>
    </>
  );
}

export default HOC(Login);
