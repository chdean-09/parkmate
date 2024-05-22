import DisplayProfile from "@/components/custom/profile/displayProfile";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const revalidate = 0;

async function ProfilePage({}: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <DisplayProfile owner={user} />
    </div>
  );
}

export default ProfilePage;
