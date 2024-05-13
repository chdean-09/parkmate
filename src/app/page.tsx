import PayPalPayment from "@/components/custom/paypal/Payment";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutForm from "@/components/custom/logoutForm";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LogoutForm user={user} />
    </main>
  );
}
