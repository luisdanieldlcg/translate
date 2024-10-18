"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import React, { useState } from "react";
import { signUp } from "@/api";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  // hold form data
  const [form, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    errorMessage: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      setFormData({ ...form, errorMessage: "Please fill in all fields." });
      return;
    }

    // is valid email
    if (!form.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setFormData({ ...form, errorMessage: "Please enter a valid email." });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setFormData({
        ...form,
        errorMessage: "The passwords entered do not match.",
      });
      return;
    }
    setFormData({ ...form, loading: true });
    await signUp(
      form.email,
      form.password,
      (user) => {
        // navigate to /home
        setFormData({ ...form, loading: false });
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
    <div className="max-w-screen-sm mx-auto my-24 ">
      <h1 className="text-center text-3xl mt-24 mb-12">translate.</h1>

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

        <label htmlFor="confirm-password" className="font-bold">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
          className="outlined-input !py-3"
          onChange={(e) =>
            setFormData({ ...form, confirmPassword: e.target.value })
          }
        />
        <button type="submit" className="primary-button my-4">
          {form.loading ? <Loading className="mx-auto" size={24} /> : "Signup"}
        </button>
      </form>
      <hr className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="text-center mt-4">
        Already have an account? {""}
        <Link className="font-bold" href="/login">
          Click to login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
