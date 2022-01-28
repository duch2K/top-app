import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import styles from './Sort.module.css';

export const Sort: NextPage<SortProps> = ({ sort, setSort, className, ...props }) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        className={cn({
          [styles.active]: sort == SortEnum.Rating
        })}
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon} />По рейтингу
      </span>
      <span
        className={cn({
          [styles.active]: sort == SortEnum.Price
        })}
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon className={styles.sortIcon} />По цене
      </span>
    </div>
  );
};

