/* eslint-disable no-use-before-define */
import React from 'react';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { parseISO, format } from 'date-fns';
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
  return (
    <>
      <Head>
        <title> Home | space traveling</title>
      </Head>
      <div className={styles.container}>
        <main>
          {postsPagination.results.map(post => {
            const { first_publication_date, uid } = post;
            const { author, subtitle, title } = post.data;

            return (
              <div key={uid} className={styles['post-container']}>
                <h2>
                  <Link href={`/post/${uid}`}>
                    <a>{title}</a>
                  </Link>
                </h2>
                <p>{subtitle}</p>
                <small>
                  <FiCalendar />
                  {first_publication_date}
                </small>
                <small>
                  <FiUser />
                  {author}
                </small>
              </div>
            );
          })}
        </main>
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

    const isoDate = parseISO(first_publication_date);
    const formated_date = format(isoDate, 'dd MMM yyyy');

    const { author, subtitle, title } = p.data;

    return {
      uid,
      first_publication_date: formated_date,
      data: { title, subtitle, author },
    };
  });

  return { props: { postsPagination: { results: result, next_page: '50' } } };
};
