import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Logo from '@/layout/logo.svg';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { ButtonIcon } from '@/components';
import { Sidebar } from '@/layout/Sidebar/Sidebar';

export const Header: NextPage<HeaderProps> = ({ className, ...props }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router])

  const handleClick = () => {
    setIsOpened(state => !state);
  }

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      opacity: 0,
      x: '100%'
    }
  }

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon variant="white" icon="menu" onClick={handleClick} />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial="closed"
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon className={styles.menuClose} variant="white" icon="close" onClick={handleClick} />
      </motion.div>
    </header>
  );
};

