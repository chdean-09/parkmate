import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/custom/loginForm";
import { login } from "@/lib/login";
import Link from "next/link";

export default async function Login() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/home");
  }

  return (
    <div className="p-5 flex flex-col h-screen items-center justify-center w-screen">
      <div className="">
        <LoginForm login={login} />
        <h1>
          <span id="signup-question">No account?{" "}</span>
          <Link id="signup-link" href="/signup" className="underline">
            Sign up now!
          </Link>
        </h1>
      </div>
    </div>
  );
}
