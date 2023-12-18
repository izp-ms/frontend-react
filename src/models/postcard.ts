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

export interface PostcardCollection {
  userId: number;
  postcardDataIds: number[];
}

export interface FavoritePostcards {
  userId: string;
  postcardIdsWithOrders: FavoritePostcard[];
}

export interface FavoritePostcard {
  postcardId: number;
  orderId: number;
}

export interface TransferPostcard {
  postcardDto: PostcardToSend;
  newUserId: number;
}

export interface PostcardToSend {
  id: number;
  title: string;
  content: string;
  postcardDataId: number;
  createdAt: string;
  userId: number;
  isSent: boolean;
}

export interface TransferResponse {
  id: number,
  userId: number,
  postcardId: number,
  receivedAt: string,
}

// export interface PaginationResponse {
//   pageNumber: number;
//   pageSize: number;
//   totalCount: number;
//   totalPages: number;
//   content: PostcardWithImage[];
// }

// export interface PostcardWithImage {
//   id: number;
//   title: string;
//   content: string;
//   postcardDataId: number;
//   type: string;
//   createdAt: string;
//   userId: number;
//   isSent: boolean;
//   imageBase64: string;
//   country: string;
//   city: string;
//   postcardDataTitle: string;
//   longitude: string;
//   latitude: string;
//   collectRangeInMeters: number;
// }

// export interface PaginationResponse {
//   pageNumber: number;
//   pageSize: number;
//   totalCount: number;
//   totalPages: number;
//   content: PostcardWithImage[];
// }

// export interface PostcardWithImage {
//   id: number;
//   title: string;
//   content: string;
//   postcardDataId: number;
//   type: string;
//   createdAt: string;
//   userId: number;
//   isSent: boolean;
//   imageBase64: string;
//   country: string;
//   city: string;
//   postcardDataTitle: string;
//   longitude: string;
//   latitude: string;
//   collectRangeInMeters: number;
// }