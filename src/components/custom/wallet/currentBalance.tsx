import React from "react";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import { User } from "lucia";

export default function CurrentBalance({ owner }: { owner?: User }) {
  if (!owner) {
    return (
      <div className="w-full flex flex-col px-5 py-7">
        <h2 className="text-sm uppercase text-white/50">Current Balance</h2>
        <p className="text-white text-3xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-5 py-7">
      <h2 className="text-sm uppercase text-white/50">Current Balance</h2>
      <p className="text-white text-3xl">
        {owner.wallet !== undefined && owner.wallet >= 0 ? convertToPhPesoFormat(owner.wallet) : "₱0.00"}
      </p>
    </div>
  );
}
