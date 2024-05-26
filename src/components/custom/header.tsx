import React from "react";
import DropDownMenu from "./dropDownMenu";
import Link from "next/link";
import LogoutForm from "./logoutForm";
import { NavLinks } from "./custom-ui/nav-links";

async function Header() {
  return (
    <div className="flex justify-between items-center mb-3 p-3 border-b shadow-sm">
      <h1 id="app-title" className="text-3xl font-semibold">Parkmate</h1>
      <div className="md:hidden flex items-center">
        <DropDownMenu />
      </div>
      <div className="hidden md:block">
        <NavLinks />
      </div>
    </div>
  );
}

export default Header;
