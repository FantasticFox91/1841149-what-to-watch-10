
import { ReviewData } from '../../types/review-data';
import { dateValue, humanizedDate } from '../../utils/humazie';

type ReviewCardProp = {
  comment: ReviewData;
}

function ReviewCard({comment}: ReviewCardProp): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={dateValue(comment.date)}>{humanizedDate(comment.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating.toFixed(1)}</div>
    </div>
  );
}

export default ReviewCard;

