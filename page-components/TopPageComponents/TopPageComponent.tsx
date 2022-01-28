import { NextPage } from "next";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Advantages, HhData, Htag, Sort } from "@/components";
import { Tag } from "@/components";
import { SortEnum } from "@/components/Sort/Sort.props";
import styles from "./TopPageComponent.module.css";
import { useReducer } from "react";
import { sortReducer } from "@/components/Sort/sort.reducer";

export const TopPageComponent: NextPage<TopPageComponentProps> = ({ page, products, firstCategory }) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && <div>
          <Tag color="grey" size="m">{products.length}</Tag>
        </div>}
        <Sort sort={sort} setSort={setSort} />
      </div>

      <div>
        {sortedProducts && sortedProducts.map(p => (<div key={p._id}>{p.title}</div>))}
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
