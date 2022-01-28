import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { InputProps } from './Input.props';
import styles from './Input.module.css';

export const Input: NextPage<InputProps> = ({ className, ...props }) => {
  return (
    <input className={cn(styles.input, className)} {...props} />
  );
};

