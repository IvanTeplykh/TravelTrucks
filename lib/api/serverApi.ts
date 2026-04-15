import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";
import { AxiosResponse } from "axios";

const getHeaders = async () => {
  const cookieStore = await cookies();
  
  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const headers = await getHeaders();
  const { data } = await api.get<FetchNotesResponse>("/notes", { 
    params,
    headers 
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getHeaders();
  const { data } = await api.get<User>(`/users/me`, { headers });
  return data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const headers = await getHeaders();
  return api.get(`/auth/session`, { headers });
};