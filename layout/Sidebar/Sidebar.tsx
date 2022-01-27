import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import { Menu } from '@layout/Menu/Menu';

export const Sidebar: NextPage<SidebarProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};

