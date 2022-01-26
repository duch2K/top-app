import React, { useContext } from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import styles from './Menu.module.css';
import { Context } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import GradHatIcon from './icons/grad-hat.svg';
import CloudIcon from './icons/cloud.svg';
import BookIcon from './icons/book.svg';
import BoxIcon from './icons/box.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';


const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <GradHatIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <CloudIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'книги', icon: <BookIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Товары', icon: <BoxIcon />, id: TopLevelCategory.Products }
];

export const Menu: NextPage = () => {
  const { menu, setMenu, firstCategory } = useContext(Context);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(m => (
          <div key={m.route}>
            <a href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id == firstCategory
              })}>
                {m.icon}
                <span>
                  {m.name}
                </span>
              </div>
            </a>
            {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel}>
              {m._id.secondCategory}
            </div>
            <div className={cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpened]: m.isOpened
            })}>
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(p => (
        <a href={`/${route}/${p.alias}`} key={p.category} className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: true
        })}>
          {p.category}
        </a>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};

