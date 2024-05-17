import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import LogoutForm from "./logoutForm";

const DropDownMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/burgermenu.webp"
          width={30}
          height={30}
          alt="Picture of the author"
        />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <ul className="flex flex-col gap-3">
            <li>
              <SheetClose asChild>
                <Link href="/home">Home</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/nearby">Nearby</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/maps">Maps</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/profile">Profile</Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <LogoutForm />
              </SheetClose>
            </li>
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default DropDownMenu;
