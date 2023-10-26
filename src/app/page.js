'use client'

import { useSession, signOut } from "next-auth/react";
import User from "@/components/User";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-red-500">Hello World {session ? <User session={session} /> : "GUEST"}</h1>
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>Sign Out</Button>
    </div>
  );
}
