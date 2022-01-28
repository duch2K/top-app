import { NextPage } from 'next';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import ArrowIcon from './arrow.svg';
import styles from './Button.module.css';

export const Button: NextPage<ButtonProps> = ({ variant, arrow = 'none', children, className, ...props }) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.ghost]: variant === 'ghost'
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && <span className={cn(styles.arrow, {
        [styles.dows]: arrow == 'down'
      })}>
        <ArrowIcon />
      </span>}
    </button>
  );
};