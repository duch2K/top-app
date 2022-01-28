import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';

export const Textarea: NextPage<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea className={cn(styles.textarea, className)} {...props} />
  );
};

