import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function DisplayProfile({ user }: UserProps) {
  const { username, ownedLocations, occupiedSlots } = user;

  const balance = 1000;

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
      <p className="font-semibold text-3xl">{username}</p>
      {/* INFO */}
      <div className="w-full flex items-center justify-center my-7">
        <div className="flex gap-3 h-10 items-center">
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">
              {ownedLocations ? ownedLocations : 0}
            </p>
            <p className="text-blue-700">Owned</p>
          </div>
          {/* Hopefully can view currently reserved parking spot */}
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">
              {occupiedSlots ? occupiedSlots : 0}
            </p>
            <p className="text-blue-700">Reserved</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">{balance}</p>
            <p className="text-blue-700">Balance</p>
          </div>
        </div>
      </div>
      {/* Redirect Buttons */}
      <div className="w-full text-center">
        <Link
          className={`w-full ${buttonVariants({ variant: "ghost" })}`}
          href={"/get-currently-owned"}
        >
          View Owned Slot
        </Link>
        <Separator />

        {/* E-Wallet */}
        <Link
          className={`w-full ${buttonVariants({ variant: "ghost" })}`}
          href={"/wallet"}
        >
          ₱ Wallet
        </Link>
      </div>
      <Separator />
    </div>
  );
}

export default DisplayProfile;
