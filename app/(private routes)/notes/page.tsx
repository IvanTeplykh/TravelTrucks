import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Notes | NoteHub',
  description: 'View and manage your personal notes on NoteHub.',
};

export default function NotesPage() {
  redirect("/notes/filter/all");
}
