import { NextPage } from 'next';
import cn from 'classnames';
import { AdvantagesProps } from './Advantages.props';
import CheckIcon from './check.svg';
import styles from './Advantages.module.css';

export const Advantages: NextPage<AdvantagesProps> = ({ advantages }) => {
  console.log(advantages);
  return (
    <>
      {advantages.map(a => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div>{a.description}</div>
        </div>
      ))}
    </>
  );
};