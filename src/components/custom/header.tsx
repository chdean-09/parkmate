import React from "react";
import DropDownMenu from "./dropDownMenu";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between items-center mb-3 p-3 border-b shadow-sm">
      <h1 className="text-3xl font-semibold">Parkmate</h1>
      <div className="md:hidden flex items-center">
        <DropDownMenu />
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-3">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/nearby">Nearby</Link>
          </li>
          <li>
            <Link href="/maps">Maps</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
