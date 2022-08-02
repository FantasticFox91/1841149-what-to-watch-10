import { ReviewData } from '../../types/review-data';

type ReviewCardProp = {
  comment: ReviewData;
}

function ReviewCard({comment}: ReviewCardProp): JSX.Element {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(comment.date);
  const humanizeDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${new Date(comment.date).getFullYear()}`;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={`${date.getFullYear()}-0${date.getDate()}-0${date.getMonth()}`}>{humanizeDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating.toFixed(1)}</div>
    </div>
  );
}

export default ReviewCard;

