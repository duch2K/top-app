import React, { FC } from 'react';
import cn from 'classnames';
import { CardProps } from './Card.props';
import styles from './Card.module.css';

export const Card: FC<CardProps> = ({ color = 'white', className, children, ...props }) => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color == 'blue'
      })}
      {...props}
    >
      {children}
    </div>
  );
};

