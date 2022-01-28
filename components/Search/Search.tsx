import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { NextPage } from 'next';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import { Button, Input } from '@/components';
import SearchGlassIcon from './search-glass.svg';
import { useRouter } from 'next/router';

export const Search: NextPage<SearchProps> = ({ className, ...props }) => {
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const goToSearch = (e: MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      router.push({
        pathname: '/search',
        query: {
          q: search
        }
      })
    }
  }

  return (
    <div className={styles.search}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <Button
        variant="primary"
        className={styles.button}
        onClick={goToSearch}
        onKeyDown={handleKeyDown}
      >
        <SearchGlassIcon />
      </Button>
    </div>
  );
};

