export interface Postcard {
  id: string;
  userId: string;
  title: string;
  content: string;
  image: PostcardData;
  type: string;
  createdAt: Date;
}

export interface PostcardData {
  id: string;
  imageBase64: string;
  country: string;
  city: string;
  longitude: string;
  latitude: string;
}
