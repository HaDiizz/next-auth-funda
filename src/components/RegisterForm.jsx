"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    password: "",
    confirm_password: "",
  });
  const { username, fullName, password, confirm_password } = form;
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
          username,
          fullName,
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
        name="username"
        type="text"
        placeholder="Username"
        onChange={handleChangeInput}
      />
      <Input
        name="fullName"
        type="text"
        placeholder="Full Name"
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
