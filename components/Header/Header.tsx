import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          TravelTrucks
        </Link>
        <nav className={css.nav}>
          <Link href="/" className={css.link}>
            Home
          </Link>
          <Link href="/catalog" className={css.link}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
