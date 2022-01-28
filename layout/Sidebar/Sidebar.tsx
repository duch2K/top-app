import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import { Menu } from '@/layout/Menu/Menu';
import Logo from '@/layout/logo.svg';
import { Search } from '@/components';

export const Sidebar: NextPage<SidebarProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      <Logo className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};

