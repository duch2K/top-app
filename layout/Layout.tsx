import React, { useEffect, useState, KeyboardEvent, FC } from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { AppContext, ContextProvider } from '../context/app.context';

export const Layout: NextPage<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />

      <Sidebar className={styles.sidebar} />
      <main className={styles.body}>
        {children}
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & AppContext>(Component: FC<T>) => {
  return function withLayout(props: T): JSX.Element {
    return (
      <ContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </ContextProvider>
    );
  }
}

