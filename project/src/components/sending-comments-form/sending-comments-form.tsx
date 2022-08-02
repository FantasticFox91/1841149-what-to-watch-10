import { ChangeEvent, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';

function SendingCommentsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    rating: '',
    'review-text': '',
  });

  const fieldChangeHandler = (evt: ChangeEvent<(HTMLInputElement | HTMLTextAreaElement)>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const starsButtonList = Array.from({length: 10}, (_, i) => {
    const key = String(10 - i);
    return (
      <>
        <input className="rating__input" id={`star-${key}`} type="radio" name="rating" value={`${key}`} onChange={fieldChangeHandler} />
        <label className="rating__label" htmlFor={`star-${key}`}>{`Rating ${key}`}</label>
      </>);
  });

  const onReviewFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const sendingFormData = {
      rating: Number(formData.rating),
      comment: formData['review-text'],
    };

    if (formData.rating && formData['review-text']) {
      dispatch(addReviewAction([params?.id, sendingFormData]));
      navigate(`${AppRoute.MoviePage}${params?.id}`);
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={onReviewFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {starsButtonList}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={fieldChangeHandler}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default SendingCommentsForm;
