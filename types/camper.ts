export interface Amenities {
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  kitchen?: boolean;
  AC?: boolean;
  bathroom?: boolean;
  [key: string]: boolean | undefined;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface GalleryImage {
  original: string;
  thumb: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews?: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[]; 
  
  gallery?: GalleryImage[];
  coverImage?: string;
  reviews?: Review[];
}

export interface PaginatedCampersResponse {
  campers: Camper[];
  total: number;
}
