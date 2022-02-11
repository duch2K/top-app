import { KeyboardEvent } from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import styles from './Sort.module.css';

export const Sort: NextPage<SortProps> = ({ sort, setSort, className, ...props }) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName}>
        Сортироовка
      </div>
      <button
        id="rating"
        className={cn({
          [styles.active]: sort == SortEnum.Rating
        })}
        onClick={() => setSort(SortEnum.Rating)}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />По рейтингу
      </button>
      <button
        id="price"
        className={cn({
          [styles.active]: sort == SortEnum.Price
        })}
        onClick={() => setSort(SortEnum.Price)}
        aria-laballedby="sort price"
        aria-selected={sort == SortEnum.Price}
      >
        <SortIcon className={styles.sortIcon} />По цене
      </button>
    </div>
  );
};

