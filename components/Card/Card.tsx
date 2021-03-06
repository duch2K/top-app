import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { CardProps } from './Card.props';
import styles from './Card.module.css';
import { motion } from 'framer-motion';

export const Card = motion(forwardRef(({ color = 'white', className, children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color == 'blue'
      })}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}));

