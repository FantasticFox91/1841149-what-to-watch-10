import { ChangeEvent, useState, FormEvent, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetReviewStatus } from '../../store/add-review-process/add-review-process';
import { getLoadingStatus, getReviewStatus } from '../../store/add-review-process/selectors';
import { addReviewAction } from '../../store/api-actions';

function SendingCommentsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const reviewStatus = useAppSelector(getReviewStatus);
  const loadingStatus = useAppSelector(getLoadingStatus);
  const [formData, setFormData] = useState({
    rating: '',
    'review-text': '',
  });
  const [isDisable, setDisable] = useState(true);

  const fieldChangeHandler = (evt: ChangeEvent<(HTMLInputElement | HTMLTextAreaElement)>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  useEffect(() => {
    if (formData.rating === '') {
      return setDisable(true);
    }
    if (formData['review-text'].length < 50 || formData['review-text'].length > 400) {
      return setDisable(true);
    }
    setDisable(false);
    if (reviewStatus) {
      navigate(`${AppRoute.MoviePage}${params?.id}`);
      dispatch(resetReviewStatus);
    }
  }, [dispatch, navigate, params?.id, reviewStatus, formData]);

  const starsButtonList = Array.from({length: 10}, (_, i) => {
    const key = String(10 - i);
    return (
      <Fragment key={key}>
        <input className="rating__input" id={`star-${key}`} type="radio" name="rating" value={`${key}`} onChange={fieldChangeHandler} disabled={loadingStatus}/>
        <label className="rating__label" htmlFor={`star-${key}`}>{`Rating ${key}`}</label>
      </Fragment>);
  });

  const handleReviewFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const sendingFormData = {
      rating: Number(formData.rating),
      comment: formData['review-text'],
    };

    if (formData.rating && formData['review-text']) {
      dispatch(addReviewAction([params?.id, sendingFormData]));
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleReviewFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {starsButtonList}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength={50} maxLength={400} onChange={fieldChangeHandler}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isDisable || loadingStatus}>Post</button>
        </div>

      </div>
    </form>
  );
}

export default SendingCommentsForm;
