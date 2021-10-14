/* eslint-disable no-use-before-define */
import React from 'react';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src="/images/Logo.svg" alt="logo" />
    </header>
  );
};

export default Header;
