import { NextPage } from 'next';
import cn from 'classnames';
import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';

export const ButtonIcon: NextPage<ButtonIconProps> = ({ variant = 'white', icon, className, ...props }) => {
  const IconComponent = icons[icon];

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.white]: variant === 'white'
      })}
      {...props}
    >
      <IconComponent />
    </button>
  );
};