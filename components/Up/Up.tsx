import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { motion, useAnimation } from 'framer-motion';
import { ButtonIcon } from '@/components';
import { UpProps } from './Up.props';
import styles from './Up.module.css';
import { useScrollY } from '@/hooks/useScrollY';

export const Up: NextPage<UpProps> = ({ className, ...props }) => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon variant="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};

