import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from ';
import { ParsedUrlQuery } from ';
import axios from ';
import { MenuItem } from ';
import { TopLevelCategory, TopPageModel } from ';
import { ProductModel } from ';
import { withLayout } from ';
import { firstLevelMenu } from ';

const Type: NextPage<TypeProps> = ({ menu, firstCategory }) => {

  return (
    <>
      Type: {firstCategory}
    </>
  );
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => '/' + m.route),
    fallback: true
  };
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory: firstCategoryItem.id
  });

  if (!menu.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}