import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import React from "react";

export default async function CurrentBalance({ owner }: UserProps) {
  
  return (
    <div className="w-full flex flex-col px-5 py-7">
      <h2 className="text-sm uppercase text-white/50">Current Balance</h2>
      <p className="text-white text-3xl">
        {convertToPhPesoFormat(owner.wallet)}
      </p>
    </div>
  );
}
