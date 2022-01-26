import React, { FC } from 'react';
import cn from 'classnames';
import { PProps } from './Tag.props';
import styles from './P.module.css';

export const P: FC<PProps> = ({ size, children, className, ...props }) => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.l]: size == 'l'
      })}
      {...props}
    >
      {children}
    </p>
  );
};

