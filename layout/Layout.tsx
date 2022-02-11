import React, { FC, KeyboardEvent, useRef, useState } from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import { Header, Sidebar, Footer } from '@/layout';
import { AppContext, ContextProvider } from '@/context/app.context';
import { Up } from '@/components';

export const Layout: NextPage<LayoutProps> = ({ children }) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContent = (key: KeyboardEvent) => {
    if (key.code = 'Space', key.code = 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  }

  return (
    <div className={styles.wrapper}>
      <a
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        tabIndex={0}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContent}
      >To content</a>
      <Header className={styles.header} />

      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0}>
        {children}
      </main>

      <Footer className={styles.footer} />
      <Up />
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

