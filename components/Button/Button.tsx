import { NextPage } from 'next';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import ArrowIcon from './arrow.svg';
import styles from './Button.module.css';
import { motion, useMotionValue } from 'framer-motion';

export const Button: NextPage<ButtonProps> = ({ variant, arrow = 'none', children, className, ...props }) => {
  const scale = useMotionValue(1);

  return (
    <motion.button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.ghost]: variant === 'ghost'
      })}
      whileHover={{ scale: 1.05 }}
      style={{ scale }}
      {...props}
    >
      {children}
      {arrow !== 'none' && <span className={cn(styles.arrow, {
        [styles.dows]: arrow == 'down'
      })}>
        <ArrowIcon />
      </span>}
    </motion.button>
  );
};