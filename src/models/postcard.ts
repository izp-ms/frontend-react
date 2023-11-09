export interface Postcard {
  id: number;
  title: string;
  content: string;
  postcardDataId: number;
  type: string;
  createdAt: string;
  userId: number;
  isSent: boolean;
  imageBase64: string;
  country: string;
  city: string;
  postcardDataTitle: string;
  longitude: string;
  latitude: string;
  collectRangeInMeters: number;
  order?: number;
}


export interface PaginationResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  content: PostcardWithImage[];
}

export interface PostcardWithImage {
  id: number;
  title: string;
  content: string;
  postcardDataId: number;
  type: string;
  createdAt: string;
  userId: number;
  isSent: boolean;
  imageBase64: string;
  country: string;
  city: string;
  postcardDataTitle: string;
  longitude: string;
  latitude: string;
  collectRangeInMeters: number;
}
