import React, { useState } from 'react';
import { NextPage } from 'next';
import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '@/components';
import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { ReviewFormModel, ReviewSentResponse } from './ReviewForm.interface';
import { API } from '@/helpers/api';
import axios from 'axios';

export const ReviewForm: NextPage<ReviewFormProps> = ({ productId, isOpen, className, ...props }) => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (formData: ReviewFormModel) => {
    try {
      const { data } = await axios.post<ReviewSentResponse>(API.review.createDemo, {
        ...formData,
        productId
      });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Error!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          error={errors.name}
          placeholder="Имя"
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          className={styles.title}
          error={errors.title}
          placeholder="Заголовок отзыва"
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                rating={field.value}
                error={errors.rating}
                ref={field.ref}
                setRating={field.onChange}
                isEditable
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          className={styles.description}
          error={errors.description}
          placeholder="Текст отзыва"
        />
        <div className={styles.submit}>
          <Button variant="primary">Отправить</Button>
          <span>* Перед публикацией отзыв пройдет предварительную проверку</span>
        </div>
      </div>

      {isSuccess && <div className={cn(styles.success, styles.panel)}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>
          Спасибо, ваш отзыв будет опубликован после проверки.
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className={styles.close}
          aria-label="Закрыть оповещение"
        >
          <CloseIcon />
        </button>
      </div>}

      {error && <div className={cn(styles.error, styles.panel)}>
        Что-то пошло не так, попробуйте обновить страницу
        <button
          onClick={() => setError('')}
          className={styles.close}
          aria-label="Закрыть оповещение"
        >
          <CloseIcon />
        </button>
      </div>}
    </form>
  );
};
