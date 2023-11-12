"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data && data.user) {
      router.push("/");
    }
  }, [data, router]);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form
  
  async function handleGoogleSignIn() {
    await signIn("google", { callbackUrl: process.env.NEXTAUTH_URL });
  }

  async function handleGithubSignIn() {
    await signIn("github", { callbackUrl: process.env.NEXTAUTH_URL });
  }

  async function handleCredentialSignIn() {
    await signIn("credentials", {
      username,
      password,
      callbackUrl: process.env.NEXTAUTH_URL,
    });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
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
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChangeInput}
      />
      <Button
        type="submit"
        className="bg-indigo-500"
        onClick={handleCredentialSignIn}
      >
        Login
      </Button>
      <Button className="bg-red-500" onClick={handleGoogleSignIn}>
        Login With Google
      </Button>
      <Button onClick={handleGithubSignIn}>Login With Github</Button>
    </form>
  );
};

export default LoginForm;
