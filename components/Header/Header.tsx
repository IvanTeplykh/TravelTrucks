"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <span className={css.logoText}>Travel</span>
          <span className={css.logoText2}>Trucks</span>
        </Link>
        <nav className={css.nav}>
          <Link href="/" className={`${css.link} ${pathname === "/" ? css.active : ""}`}>
            Home
          </Link>
          <Link href="/catalog" className={`${css.link} ${pathname === "/catalog" ? css.active : ""}`}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
