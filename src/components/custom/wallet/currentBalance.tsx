import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import React from "react";

export default async function CurrentBalance({ user }: UserProps) {
  const { id } = user; // get current balance of user based on its id

  return (
    <div className="md:w-[50%] w-full flex flex-col px-5 py-10">
      <h2 className="text-sm uppercase text-white/50">Current Balance</h2>
      <p className="text-white text-3xl">{convertToPhPesoFormat(1000)}</p>
    </div>
  );
}
