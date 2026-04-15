import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://66b1f8c71ca8ad33d4f5f63e.mockapi.io";

export const api = axios.create({
  baseURL,
});

export const fetchCampers = async () => {
  const { data } = await api.get('/campers');
  return data;
}

export const fetchCamperById = async (id: string) => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
}
