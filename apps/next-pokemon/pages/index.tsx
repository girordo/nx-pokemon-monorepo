import React, { useCallback, useEffect, useState } from 'react';
import type { Pokemon } from '@nx-pokemon-monorepo/shared-types';
import styles from './index.module.scss';

export function Index() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  return (
    <div className={styles.page}>
      <input value={search} onChange={onSetSearch} />
      <ul>
        {pokemon.map(({ name: { english }, id }) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
