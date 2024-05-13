import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signup } from "@/lib/signup";
import Link from "next/link";
import SignupForm from "@/components/custom/signUpForm";

export default async function Signup() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/home");
  }

  return (
    <div className="p-5 flex flex-col h-screen items-center justify-center w-screen">
      <SignupForm signUp={signup} />
      <h1>
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in now!
        </Link>
      </h1>
    </div>
  );
}
