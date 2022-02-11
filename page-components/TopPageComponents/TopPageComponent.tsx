import { NextPage } from 'next';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '@/components';
import styles from './TopPageComponent.module.css';
import { useEffect, useReducer } from 'react';
import { sortReducer } from '@/components/Sort/sort.reducer';
import { SortEnum } from '@/components/Sort/Sort.props';

export const TopPageComponent: NextPage<TopPageComponentProps> = ({ page, products, firstCategory }) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  }

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products})
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && <div>
          <Tag color="grey" size="m" aria-label={products.length + 'элементов'}>{products.length}</Tag>
        </div>}
        <Sort sort={sort} setSort={setSort} />
      </div>

      <div>
        {sortedProducts && sortedProducts.map(p => (<Product key={p._id} product={p} layout />))}
      </div>

      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        {products && <Tag color="red" size="m">hh.ru</Tag>}
        <span></span>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 &&
      <>
        <Htag tag="h2">Преймущества</Htag>
        <Advantages advantages={page.advantages} />
      </>}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map(t => <Tag key={t} color="primary">{t}</Tag>)}
    </div>
  );
};
