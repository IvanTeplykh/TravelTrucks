"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/authStore";
import { logout as apiLogout } from "../../lib/api/clientApi";
import css from "./AuthNavigation.module.css";
import Link from "next/link";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      clearIsAuthenticated();
      router.push("/sign-in");
    }
  };

  return (
    <ul className={css.navigation}>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email || "User email"}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
