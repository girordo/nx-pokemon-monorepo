import React, { useCallback, useEffect, useState } from 'react';
import type { Pokemon } from '@nx-pokemon-monorepo/shared-types';
import styles from './index.module.scss';

export async function getServerSideProps(ctx) {
  let pokemon = [];
  if (ctx.query.q) {
    const res = await fetch(`http://localhost:3333/search?q=${ctx.query.q}`);
    pokemon = await res.json();
  }
  return {
    props: {
      q: ctx.query.q ?? '',
      pokemon,
    },
  };
}

export function Index({
  q,
  pokemon: initialPokemon,
}: {
  q: string;
  pokemon: Pokemon[];
}) {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${escape(search)}`)
      .then((resp) => resp.json())
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
