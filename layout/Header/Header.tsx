import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';

export const Header: NextPage<HeaderProps> = ({ ...props }) => {
  return (
    <header {...props}>
      header
    </header>
  );
};

