import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmComments } from '../../store/api-actions';
import { getFilmComments } from '../../store/film-process/selectors';
import ReviewCard from '../review-card/review-card';

function Reviews(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getFilmComments);
  const reviewList =
      comments.map((comment) => (
        <ReviewCard key={comment.id} comment={comment} />
      ));

  useEffect(() => {
    dispatch(fetchFilmComments(params?.id));
  }, [params?.id, dispatch]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewList}
      </div>
    </div>
  );
}

export default Reviews;
