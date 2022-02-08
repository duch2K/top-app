import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { Button, Htag, P,  Rating, Tag } from '@/components';
import { MenuItem } from '@/interfaces/menu.interface';
import { withLayout } from '@/layout/Layout';
import { API } from '@/helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">text</Htag>
      <Button variant="primary" arrow="down">Yo</Button>
      <P>qewrqerwr</P>
      <P size="s">qewrqerwr</P>
      <Tag size="s">sdfsdM</Tag>
      <Tag size="s" color="red">fsdfM</Tag>
      <Tag size="s" color="green">fsdfM</Tag>
      <Tag size="s" color="primary">fsdfM</Tag>
      <Rating isEditable rating={rating} setRating={setRating} />
      <ul>
        {menu.map(m => (
          <li
            key={m._id.secondCategory}
          >{m._id.secondCategory}</li>
        ))}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  }
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}