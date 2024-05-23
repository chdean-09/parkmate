import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";

async function DisplayProfile({ owner }: UserProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-24 relative rounded-full border p-5 flex items-center justify-center my-8">
        <Image
          src="/user.png"
          alt="Account icons created by khulqi Rosyid - Flaticon"
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </div>
      <p className="font-semibold text-3xl">{owner.username}</p>
      {/* INFO */}
      <div className="w-full flex items-center justify-center my-7">
        <div className="flex gap-3 h-10 items-center">
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">Zero</p>
            <p className="text-blue-700">Owned</p>
          </div>
          {/* Hopefully can view currently reserved parking spot */}
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">Zero</p>
            <p className="text-blue-700">Reserved</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">{convertToPhPesoFormat(owner.wallet)}</p>
            <p className="text-blue-700">Balance</p>
          </div>
        </div>
      </div>
      {/* Redirect Buttons */}
      <div className="w-full text-center">
        <Button asChild variant={"ghost"} className="w-full ">
          <Link href="/reserved-spot"> View Owned Slot</Link>
        </Button>
        <Separator />

        {/* E-Wallet */}
        <Button asChild variant={"ghost"} className="w-full ">
          <Link href="/wallet">₱ Wallet</Link>
        </Button>
        <Separator />

        <Button asChild variant={"ghost"} className="w-full ">
          <Link href="/cashin">Cash In</Link>
        </Button>
      </div>
    </div>
  );
}

export default DisplayProfile;
