"use client";

import { User } from "lucia";
import { Button } from "../ui/button";
import { logout } from "@/lib/logout";

export default function LogoutForm({ user }: { user: User }) {
  return (
    <div className="items-start flex flex-col gap-3">
      <h1 className="text-xl font-bold">Hello, {user.username}</h1>
      <Button variant={"destructive"} onClick={async () => await logout()}>
        Sign out
      </Button>
    </div>
  );
}
