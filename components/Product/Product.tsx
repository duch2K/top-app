import React, { MouseEventHandler, useRef, useState, forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Tag, Review, ReviewForm } from '@/components';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { declOfNum, priceRu } from '@/helpers/helpers';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: { opacity: 1, height: 'auto'},
    hidden: { opacity: 0, height: 0 }
  }

  const handleReviewOpenClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsReviewOpened(state => !state);
  }

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
        <div className={styles.tags}>{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}</div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && <div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            <div>{product.advantages}</div>
          </div>}
          {product.disAdvantages && <div className={styles.disAdvantages}>
            <div className={styles.advTitle}>Недостатки</div>
            <div>{product.disAdvantages}</div>
          </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button variant='primary'>Узнать подробнее</Button>
          <Button
            variant='ghost'
            arrow={isReviewOpened ? 'down' : 'right'}
            className={styles.reviewButton}
            onClick={handleReviewOpenClick}
          >Читать отзывы</Button>
        </div>
      </Card>
      <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial={'hidden'}>
        <Card color='blue' className={styles.reviews} ref={reviewRef}>
          {product.reviews.map(r => (
            <div key={r._id}>
              <Review review={r} />
              <Divider />
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={isReviewOpened} />
        </Card>
      </motion.div>
    </div>
  );
}));

