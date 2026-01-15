"use client";

import { useRouter } from "next/navigation";
import React from "react";

const RegisterPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      console.log("data", data);
      router.push("/");
    } catch (error: any) {
      alert(error);
      console.log(error.message);
    }
  };

  return (
    <div className="flex  text-white justify-center items-center min-h-screen w-full flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1>Register</h1>
          <label className="self-start">Email</label>
          <input
            className=" bg-gray-800 px-10 h-8  rounded-sm"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="self-start">Password</label>
          <input
            className=" bg-gray-800 px-10 h-8  rounded-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="self-start">Confirm Password</label>
          <input
            className=" bg-gray-800 px-10 h-8  rounded-sm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 w-full px-5 py-1 rounded-md"
            type="submit"
          >
            Submit
          </button>
          <p className="text-gray-200 text-sm">
            Already have an accoount ?{" "}
            <a href="/login">
              <span className="font-bold text-blue-500">Login</span>
            </a>
          </p>
        </div>
      </form>

      <div></div>
    </div>
  );
};

export default RegisterPage;
