import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password", // Change to your actual redirect URL
    });
    
    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent. Check your email.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-4 space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
