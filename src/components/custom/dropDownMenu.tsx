import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

import React from "react";

type Props = {};

const DropDownMenu = (props: Props) => {
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
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default DropDownMenu;
