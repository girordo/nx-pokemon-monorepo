import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export function Index() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => setSearch(data));
  }, [search]);

  return <div className={styles.page}></div>;
}

export default Index;
