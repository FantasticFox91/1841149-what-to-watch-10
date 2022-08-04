export type addReviewData = {
  comment: string;
  rating: number;
};

export type errorReviewData = {
  error: string;
};

export type ReviewData = {
    comment: string
    date: string
    id: number
    rating: number
    user: {
      id: number
      name: string
    }
};
