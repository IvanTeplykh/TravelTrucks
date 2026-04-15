"use client";

import { api } from "./api";
import type { Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface AuthPayload {
  email: string;
  password?: string;
}

export interface UpdateUserPayload {
  username: string;
}

export interface SessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>(`/auth/register`, payload);
  return data;
};

export const login = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>(`/auth/login`, payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post(`/auth/logout`);
};

export const checkSession = async (): Promise<SessionResponse> => {
  const { data } = await api.get<SessionResponse>(`/auth/session`);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>(`/users/me`);
  return data;
};

export const updateMe = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await api.patch<User>(`/users/me`, payload);
  return data;
};