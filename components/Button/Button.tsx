import cn from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button = ({ variant, children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.ghost]: variant === 'ghost'
      })}
      {...props}
    >
      {children}
    </button>
  );
}