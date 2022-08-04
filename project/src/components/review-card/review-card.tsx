import dayjs from 'dayjs';
import { ReviewData } from '../../types/review-data';

type ReviewCardProp = {
  comment: ReviewData;
}

function ReviewCard({comment}: ReviewCardProp): JSX.Element {
  const dateValue = dayjs(comment.date).format('YYYY-DD-MM');
  const humanizedDate = dayjs(comment.date).format('MMMM DD, YYYY');
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={dateValue}>{humanizedDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating.toFixed(1)}</div>
    </div>
  );
}

export default ReviewCard;

