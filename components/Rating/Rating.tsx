import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import cn from 'classnames';
import StarIcon from './star.svg';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [ratingArr, setRatingArr] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const computedFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating && i == 0) {
      return tabIndex ?? 0;
    }
    if (r == i + 1) {
      return tabIndex ?? 0;
    }
    return -1;
  }

  const constructRating = (currentRating: number) => {
    const updatedArr = ratingArr.map((r: JSX.Element, i: number) => {
      return (
        <>
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable
            })}
            ref={r => ratingArrRef.current?.push(r)}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            tabIndex={computedFocus(rating, i)}
            onKeyDown={handleKey}
          >
            <StarIcon />
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

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      if (!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingArrRef.current[rating]?.focus();
    }
    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrRef.current[rating - 2]?.focus();
    }
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

