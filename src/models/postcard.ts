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
}
