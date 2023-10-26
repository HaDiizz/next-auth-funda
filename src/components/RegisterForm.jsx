"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { name, email, password, confirm_password } = form;
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm_password) return alert("Password not match");
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
    } catch (error) {
      console.log("Error during registration", error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-y-10">
      <Input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChangeInput}
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChangeInput}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChangeInput}
      />
      <Input
        name="confirm_password"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChangeInput}
      />
      <Button type="submit" className="bg-indigo-500">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
