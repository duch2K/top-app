import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';
import styles from './Rating.module.css';

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [ratingArr, setRatingArr] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArr = ratingArr.map((r: JSX.Element, i: number) => {
      return (
        <>
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
            />
          </span>
        </>
      );
    });

    setRatingArr(updatedArr);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != 'Space' || !setRating) {
      return;
    }
    setRating(i);
  };


  return (
    <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
      [styles.error]: error
    })}>
      {ratingArr.map((r, i) => (<span key={i}>{r}</span>))}
      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

