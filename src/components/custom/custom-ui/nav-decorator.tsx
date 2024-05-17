import Link from "next/link";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({
  href,
  active,
  children,
  onClick,
  ...rest
}: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    {...rest}
    className={`nav-link ${
      active ? "text-indigo-500 underline" : "text-gray-600 hover:text-black"
    }`}
  >
    {children}
  </Link>
);
