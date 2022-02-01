import React, { ChangeEvent, KeyboardEventHandler, useState, MouseEventHandler } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import { Button, Input } from '@/components';
import SearchGlassIcon from './search-glass.svg';

export const Search: NextPage<SearchProps> = ({ className, ...props }) => {
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const handleSearchClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
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
        onClick={handleSearchClick}
        onKeyDown={handleKeyDown}
      >
        <SearchGlassIcon />
      </Button>
    </div>
  );
};

