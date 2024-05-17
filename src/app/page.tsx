import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutForm from "@/components/custom/logoutForm";
import PaymentButton from "@/components/custom/payment/paymentButton";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  let totalPayment = 100;
  const userId = "UniqueKey";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Introduction page for parkmate at / url
      <PaymentButton totalPayment={totalPayment} userId={userId} />
    </main>
  );
}
