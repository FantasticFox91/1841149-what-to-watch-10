import { ReviewData } from '../../types/review-data';
import ReviewCard from '../review-card/review-card';

type ReviewsProps = {
  comments: ReviewData[] | [];
}


function Reviews({comments}: ReviewsProps): JSX.Element {
  const ReviewList =
      comments.map((comment) => (
        <ReviewCard key={comment.id} comment={comment} />
      ));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {ReviewList}
      </div>
    </div>
  );
}

export default Reviews;
