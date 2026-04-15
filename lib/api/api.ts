import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://campers-api.goit.study";

export const api = axios.create({
  baseURL,
});

interface Filters {
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
  [key: string]: string | boolean | undefined; // Supports equipment flags
}

export const fetchCampers = async (page = 1, limit = 4, filters: Filters = {}) => {
  const params: Record<string, any> = { page, limit };
  
  if (filters.location) params.location = filters.location;
  if (filters.form) params.form = filters.form;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.engine) params.engine = filters.engine;
  
  // Custom API equipment filters are usually boolean flags or similar according to documentation, handle pass-through:
  const allowedAmenities = ["AC", "kitchen", "TV", "bathroom"];
  allowedAmenities.forEach(amenity => {
     if (filters[amenity]) params[amenity] = true;
  });

  const { data } = await api.get('/campers', { params });
  return data; // Returns PaginatedCampersResponse
}

export const fetchCamperById = async (id: string) => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
}

export const fetchCamperReviews = async (id: string) => {
  const { data } = await api.get(`/campers/${id}/reviews`);
  return data;
}

export const bookCamper = async (id: string, bookingData: any) => {
  const { data } = await api.post(`/campers/${id}/booking-requests`, bookingData);
  return data;
}
