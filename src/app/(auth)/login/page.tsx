"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const loginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res?.error) {
      console.log(res?.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex text-white justify-center items-center min-h-screen w-full flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex  flex-col p-10  items-center  justify-center space-y-3">
          <h1 className="font-semibold text-xl text-center ">Login</h1>
          <label className="self-start">Email</label>
          <input
            className="bg-gray-800 border px-10 h-8 border-blue-500 rounded-sm"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="self-start">Password</label>
          <input
            className="bg-gray-800 border  px-10 h-8 border-blue-500 rounded-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 w-full px-5 py-1 rounded-md"
            type="submit"
          >
            Login
          </button>
          <p className="text-gray-200 text-sm">
            Don't have an account ?{" "}
            <a href="/register">
              <span className="font-bold text-blue-500">Register</span>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default loginPage;
