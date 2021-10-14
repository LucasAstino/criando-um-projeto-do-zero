/* eslint-disable no-use-before-define */
import React from 'react';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export const Home: React.FC<HomeProps> = ({ postsPagination }) => {
  console.log(postsPagination);
  return (
    <>
      <Head>
        <title> Home | space traveling</title>
      </Head>
      <div className={styles.container}>
        <main> oi</main>
      </div>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('', { pageSize: 50 });

  const result = postsResponse.results.map((p: Post) => {
    const { uid, first_publication_date } = p;
    const { author, subtitle, title } = p.data;

    return {
      uid,
      first_publication_date,
      data: { title, subtitle, author },
    };
  });

  return { props: { postsPagination: { results: result, next_page: '50' } } };
};
