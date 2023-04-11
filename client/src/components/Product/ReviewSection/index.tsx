import React, { useEffect, useState } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { createReview, deleteReview } from 'store/slices/products/actions';
import { parseDate } from 'utils/parseDate';

import Button from 'components/UI/Button';
import Textarea from 'components/UI/Textarea';
import ButtonLoader from 'components/General/ButtonLoader';
import Like from 'resources/icons/Like';
import DisLike from 'resources/icons/DisLike';
import css from './index.module.css';

const ReviewSection: React.FC = () => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  const ordersState = useAppSelector(state => state.orders)
  const productsState = useAppSelector(state => state.products)
  const activeProduct = useAppSelector(state => state.products.activeProduct)
  const reviews = useAppSelector(state => state.products.activeProduct?.review)

  // state of comment access
  const [isReviewable, setIsRewiewable] = useState<boolean>(false)

  // states for new review
  const [score, setScore] = useState<boolean>(true)
  const [reviewText, setReviewText] = useState('')

  // add new review
  const createNewReview = () => {
    if(!activeProduct?.id || !user?.id || !user?.username) return;

    dispatch(createReview({
      productId: activeProduct?.id,
      userId: user?.id,
      score: score,
      review: reviewText,
      username: user.username,
    }))
  }

  // delete review
  const deleteOldReview = () => {
    if(!activeProduct?.id || !user?.id) return;

    if(window.confirm("Вы действительно хотите удалить отзыв?")) {
      dispatch(deleteReview({
        productId: activeProduct?.id,
        userId: user?.id,
      }))
    }
  }

  // if user already ordered product = set access to comment
  const checkOrderProductToReview = () => {
    if(!ordersState.products) return;
    for(let product of ordersState.products) {
      if(product.productId === activeProduct?.id) {
        setIsRewiewable(true)
      }
    }
  }

  // check the possibility to comment
  useEffect(() => {
    checkOrderProductToReview()
  }, [ordersState])

  // likes buttons css
  let likeClasses = [css.Like];
  let dislikeClasses = [css.Dislike];
  if(score) {
    likeClasses.push(css.ScoreActive)
    dislikeClasses = [css.Dislike];
  } else {
    dislikeClasses.push(css.ScoreActive)
    likeClasses = [css.Like];
  }

  if(reviewText.length > 255) {
    setReviewText(reviewText.slice(0, 255))
  }

  return (
    <div className={css.ReviewSection}>
      {isReviewable &&
        <section className={css.NewReview}>

          <h1>Оставить отзыв</h1>
          
          <div className={css.ReviewScoreButtons}>
            <span>Оцените товар: </span>

              <button
                className={likeClasses.join(" ")}
                onClick={() => setScore(true)}
              >
                <Like />
              </button>
            
              <button
                className={dislikeClasses.join(" ")}
                onClick={() => setScore(false)}
              >
                <DisLike />
              </button>

          </div>

          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          >
            И напишите свои впечатления о нём!
          </Textarea>

          <span>{reviewText.length} / 255</span>

          <Button
            height={35}
            width={'30%'}
            onclick={createNewReview}
          >
            {productsState.loading ? <ButtonLoader /> : 'Отправить'}
          </Button>

        </section>
      }

      <div className={css.ReviewsSection}>
        <h1>Отзывы</h1>
        {reviews && reviews?.map(review =>
          <section
            key={review.id + Date.now()}
            className={css.Review}
          >
            <div className={css.ReviewStatus}>
              {review.username}
              {review.score
                ? <div className={css.Like}>
                    <Like />
                  </div>
                : <div className={css.Dislike}>
                    <DisLike />
                  </div>
              }
            </div>
            
            <span>{parseDate(review.updatedAt)}</span>
            <span>{review.review}</span>

            {review.userId === user?.id &&
              <a onClick={deleteOldReview}>Удалить отзыв</a>
            }
          </section>
        )}

        {!reviews?.length && <span>Станьте первым, кто оставит отзыв!</span>}
      </div>

    </div>
  );
}

export default ReviewSection;