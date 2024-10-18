"use client";

import { logIn } from "@/api";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  // hold form data
  const [form, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
    errorMessage: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setFormData({ ...form, errorMessage: "Please fill in all fields." });
      return;
    }

    // is valid email
    if (!form.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setFormData({ ...form, errorMessage: "Please enter a valid email." });
      return;
    }

    setFormData({ ...form, loading: true });
    await logIn(
      form.email,
      form.password,
      (user) => {
        router.replace("/home");
      },
      (error) => {
        setFormData({
          ...form,
          loading: false,
          errorMessage: error,
        });
      }
    );
  };

  return (
    <div className="flex flex-col max-w-screen-sm mx-auto my-16 gap-5">
      <h1 className="text-center text-3xl mt-16 mb-12">translate.</h1>
      <ErrorMessage message={form.errorMessage} />

      <form
        className="flex flex-col gap-5 mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          className="outlined-input !py-3"
          onChange={(e) => setFormData({ ...form, email: e.target.value })}
        />

        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="outlined-input !py-3"
          onChange={(e) => setFormData({ ...form, password: e.target.value })}
        />
        <button className="primary-button my-4" type="submit">
          {form.loading ? <Loading className="mx-auto" size={24} /> : "Login"}
        </button>
        <div className="text-right">
          Forgot your password?
          <span className="font-bold"> Click to reset</span>
        </div>
      </form>
      <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="text-center">
        Not a member yet? {""}
        <Link className="font-bold" href="/signup">
          Click to signup
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
