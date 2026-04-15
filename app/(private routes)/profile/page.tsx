import { Metadata } from "next";
import ProfileContent from "./ProfileContent";
import { getMe } from "../../../lib/api/serverApi";

export const metadata: Metadata = {
  title: "NoteHub - User Profile",
  description: "View and edit your personal profile on NoteHub.",
  openGraph: {
    title: "NoteHub - Profile",
    description: "Your NoteHub user profile page.",
    url: "https://notehub-demo.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMe();

  return <ProfileContent user={user} />;
}
