import React, { useState } from "react";
import { validateSignup } from "../utils/validation";
import { z } from "zod";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Data:", { email, password });
    try {
      validateSignup({ email, password });
      setEmailError(null);
      setPasswordError(null);
      setSuccessMessage("Signup successful! Welcome aboard!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          if (error.path[0] === "email") {
            setEmailError(error.message);
          } else if (error.path[0] === "password") {
            setPasswordError(error.message);
          }
        });
      } else {
        setEmailError("An unexpected error occurred");
        setPasswordError("An unexpected error occurred");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={handleSignup} className="w-full max-w-md">
        <h2 className="text-2xl mb-4 ">Sign Up</h2>
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="text-red-500 mb-1">{emailError}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {passwordError && (
            <div className="text-red-500 mb-1">{passwordError}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          clic me
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
