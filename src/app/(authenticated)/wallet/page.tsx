import CurrentBalance from "@/components/custom/wallet/currentBalance";
import TransactionHistory from "@/components/custom/wallet/transactionHistory";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { TransactionLoading } from "@/components/custom/skeletonUI/transactionLoading";

type Props = {};

async function WalletPage({}: Props) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="-translate-y-3">
      <div className=" bg-gradient-to-r from-blue-700 to-blue-500 ">
        <CurrentBalance owner={user} />
      </div>
      <Suspense fallback={<TransactionLoading />}>
        <div>
          <TransactionHistory owner={user} />
        </div>
      </Suspense>
    </div>
  );
}

export default WalletPage;
