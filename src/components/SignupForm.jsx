import React, { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Account created successfully!");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md w-full p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button
          type="submit"
          className="bg-indigo-500 text-white w-full py-3 rounded-md hover:bg-indigo-600 transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
