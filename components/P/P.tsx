import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { PProps } from './P.props';
import styles from './P.module.css';

export const P: NextPage<PProps> = ({ size, children, className, ...props }) => {
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

