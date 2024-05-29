"use client";
import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../../../utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      setToken(data.token);
      alert("login successfull");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col"
        >
          <div className="mb-4 w-full">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent  text-black"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent  text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <Link className="text-blue-400 text-center" href="/register">
            Dont have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
