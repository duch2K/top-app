import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '@/components';
import UserIcon from './user.svg';
import { ReviewProps } from './Review.props';
import styles from './Review.module.css';

export const Review: NextPage<ReviewProps> = ({ review, className, ...props }) => {
  const { name, title, description, createdAt, rating } = review;

  return (
    <>
      <div className={cn(styles.review, className)} {...props}>
        <UserIcon className={styles.user} />
        <div className={styles.title}>
          <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
          <span>{title}</span>
        </div>
        <div className={styles.date}>
          {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
        </div>
        <div>
          <Rating rating={rating} />
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
    </>
  );
};

