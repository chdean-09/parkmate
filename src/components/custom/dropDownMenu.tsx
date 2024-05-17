"use client";

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

import React from "react";
import LogoutForm from "./logoutForm";
import { NavLink } from "./custom-ui/nav-decorator";
import { usePathname } from "next/navigation";

const DropDownMenu = () => {
  const pathname = usePathname();

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
                <NavLink href="/home" active={pathname === "/home"}>
                  Home
                </NavLink>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <NavLink href="/nearby" active={pathname === "/nearby"}>
                  Nearby
                </NavLink>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <NavLink href="/maps" active={pathname === "/maps"}>
                  Maps
                </NavLink>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <NavLink href="/profile" active={pathname === "/profile"}>
                  Profile
                </NavLink>
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

// "use client"

// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Image from "next/image";

// import React from "react";
// import LogoutForm from "./logoutForm";
// import { NavLink } from "./custom-ui/nav-decorator";
// import { usePathname } from "next/navigation";

// const DropDownMenu = () => {
//   const pathname = usePathname();

//   return (
//     <Sheet>
//       <SheetTrigger>
//         <Image
//           src="/burgermenu.webp"
//           width={30}
//           height={30}
//           alt="Picture of the author"
//         />
//       </SheetTrigger>

//       <SheetContent>
//         <SheetHeader>
//           <ul className="flex flex-col gap-3">
//             <li>
//               <SheetClose asChild>
//                 <NavLink href="/home" active={pathname === "/home"}>
//                   Home
//                 </NavLink>
//               </SheetClose>
//             </li>
//             <li>
//               <SheetClose asChild>
//                 <NavLink href="/nearby" active={pathname === "/nearby"}>
//                   Nearby
//                 </NavLink>
//               </SheetClose>
//             </li>
//             <li>
//               <SheetClose asChild>
//                 <NavLink href="/maps" active={pathname === "/maps"}>
//                   Maps
//                 </NavLink>
//               </SheetClose>
//             </li>
//             <li>
//               <SheetClose asChild>
//                 <NavLink href="/profile" active={pathname === "/profile"}>
//                   Profile
//                 </NavLink>
//               </SheetClose>
//             </li>
//             <li>
//               <SheetClose asChild>
//                 <LogoutForm />
//               </SheetClose>
//             </li>
//           </ul>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default DropDownMenu;
