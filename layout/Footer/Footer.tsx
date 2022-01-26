import React from 'react';
import { NextPage } from 'next';
import cn from 'classnames';

import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import { format } from 'date-fns';

export const Footer: NextPage<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div className="copyright">
        OwlTop © 2020 - {format(new Date, 'yyyy')} Все права защищены
      </div>

      <a href="#" target="_blank">Пользовательское соглашение</a>
      <a href="#" target="_blank">Политика конфиденциальности</a>
    </footer>
  );
};

