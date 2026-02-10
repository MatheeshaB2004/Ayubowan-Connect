export class ReviewMediaDto {
  id: number;
  mediaType: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  displayOrder: number;
}

export class ReviewResponseDto {
  id: number;
  listingId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  media: ReviewMediaDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class ReviewsListResponseDto {
  total: number;
  averageRating: number;
  reviews: ReviewResponseDto[];
}
