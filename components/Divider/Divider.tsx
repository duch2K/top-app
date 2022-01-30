import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { DividerProps } from './Divider.props';
import styles from './Divider.module.css';

export const Divider: NextPage<DividerProps> = ({ className, ...props }) => {
  return (
    <hr className={cn(styles.hr, className)} {...props} />
  );
};

