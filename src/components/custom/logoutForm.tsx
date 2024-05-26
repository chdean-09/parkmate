"use client";

import { Button } from "../ui/button";
import { logout } from "@/lib/logout";

export default function LogoutForm() {
  return (
    <Button id="logout-btn" variant={"destructive"} onClick={async () => await logout()}>
      Sign out
    </Button>
  );
}
