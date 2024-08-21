"use client";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// type HeaderProps = {
//   params: {
//     [string]: string | string[] | undefined;
//   };
// };

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
    id: 1,
  },
  {
    label: "Account",
    path: "/app/account",
    id: 2,
  },
];

function Header() {
  const activePathName = usePathname();

  return (
    <header className="flex h-16 items-center border-b border-white/30">
      <Logo />
      <nav className="ml-auto">
        <ul className="flex gap-x-10">
          {routes.map((route) => (
            <li
              key={route.id}
              className={cn(
                `text-md font-semibold
               text-white/[0.85] rounded-sm px-2 py-1 hover:text-white
                focus:text-white transition`,
                {
                  "bg-black/10 text-white": activePathName === route.path,
                }
              )}
            >
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
