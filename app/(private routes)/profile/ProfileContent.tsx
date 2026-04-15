"use client";

import Link from "next/link";
import { useAuthStore } from "../../../lib/store/authStore";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { User } from "../../../types/user";

export default function ProfileContent({ user: serverUser }: { user?: User }) {
  const { user: clientUser } = useAuthStore();
  const user = serverUser || clientUser;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/vite.svg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || "your_username"}</p>
          <p>Email: {user?.email || "your_email@example.com"}</p>
        </div>
      </div>
    </main>
  );
}
