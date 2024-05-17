import React from "react";
import DropDownMenu from "./dropDownMenu";
import Link from "next/link";
import LogoutForm from "./logoutForm";

async function Header() {
  return (
    <div className="flex justify-between items-center mb-3 p-3 border-b shadow-sm">
      <h1 className="text-3xl font-semibold">Parkmate</h1>
      <div className="md:hidden flex items-center">
        <DropDownMenu />
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-3 items-center">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/nearby">Nearby</Link>
          </li>
          <li>
            <Link href="/maps">Maps</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <LogoutForm />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
