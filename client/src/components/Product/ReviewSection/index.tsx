import React, { useEffect, useState } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { createReview } from 'store/slices/products/actions';

import Like from 'resources/icons/Like';
import DisLike from 'resources/icons/DisLike';
import Button from 'components/UI/Button';
import Textarea from 'components/UI/Textarea';
import css from './index.module.css';

const ReviewSection: React.FC = () => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  const activeProduct = useAppSelector(state => state.products.activeProduct)
  const ordersState = useAppSelector(state => state.orders)
  const reviews = useAppSelector(state => state.products.activeProduct?.review)

  // state of comment access
  const [isReviewable, setIsRewiewable] = useState<boolean>(false)

  // states for new review
  const [score, setScore] = useState<boolean>(true)
  const [reviewText, setReviewText] = useState('')

  // new review creation
  const createNewReview = () => {
    if(!activeProduct?.id) return;
    if(!user?.id) return;
    if(!user?.username) return;

    dispatch(createReview({
      productId: activeProduct?.id,
      userId: user?.id,
      score: score,
      review: reviewText,
      username: user.username,
    }))
  }

  // if user already ordered product = set access to comment
  const checkOrderProductToReview = () => {
    if(!ordersState.products) return;
    for(let product of ordersState.products) {
      if(product.id === activeProduct?.id) {
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
  }
  if(!score) {
      dislikeClasses.push(css.ScoreActive)
      likeClasses = [css.Like];
  }

  const parseDate = (date: string) => {
    const parsedData = Date.parse(date)
    const formattedDate = new Date(parsedData).toLocaleDateString('ru-RU')
    return formattedDate
  }

  return (
    <section className={css.ReviewSection}>
      {isReviewable &&
        <div className={css.NewReview}>

          <h1>Оставить отзыв</h1>
          
          <div className={css.ReviewScoreButtons}>
            <span>Оцените товар</span>

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

          <Button
            width={'30%'}
            onclick={createNewReview}
          >
            Отправить
          </Button>

        </div>
      }

      <div className={css.ReviewsSection}>
        <h1>Отзывы</h1>
        {reviews && reviews?.map(review =>
          <div
            key={review.id}
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
          </div>
        )}
      </div>

    </section>
  );
}

export default ReviewSection;