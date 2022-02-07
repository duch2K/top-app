import React, { MouseEventHandler, useState } from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Tag, Review, ReviewForm } from '@/components';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { declOfNum, priceRu } from '@/helpers/helpers';
import Image from 'next/image';

export const Product: NextPage<ProductProps> = ({ product, className, ...props }) => {
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  const handleReviewOpenClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsReviewOpen(state => !state);
  }

  return (
    <>
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
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          {product.reviewCount + declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </div>
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
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disAdvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disAdvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button variant="primary">Узнать подробнее</Button>
          <Button
            variant="ghost"
            arrow={isReviewOpen ? 'down' : 'right'}
            className={styles.reviewButton}
            onClick={handleReviewOpenClick}
          >Читать отзывы</Button>
        </div>
      </Card>

      <Card color="blue" className={cn(styles.reviews, {
        [styles.opened]: true,
        [styles.close]: true
      })}>
        {product.reviews.map(r => (
          <div key={r._id}>
            <Review review={r} />
            <Divider />
          </div>
        ))}
        <ReviewForm productId={product._id} isOpen={isReviewOpen} />
      </Card>
    </>
  );
};

