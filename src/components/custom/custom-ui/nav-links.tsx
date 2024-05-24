"use client";
import { usePathname } from "next/navigation";
import LogoutForm from "../logoutForm";
import { NavLink } from "./nav-decorator";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex justify-center items-center gap-6">
        <li>
          <NavLink href="/home" active={pathname === "/home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href="/nearby" active={pathname === "/nearby"}>
            Nearby
          </NavLink>
        </li>
        <li>
          <NavLink href="/maps" active={pathname === "/maps"}>
            Maps
          </NavLink>
        </li>
        <li>
          <NavLink href="/profile" active={pathname === "/profile"}>
            Profile
          </NavLink>
        </li>
        <li>
          <LogoutForm />
        </li>
      </ul>
    </nav>
  );
}
