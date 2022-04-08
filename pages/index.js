import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { Box, Center, Image, Flex, Badge, Text } from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';
import { Grid, GridItem } from '@chakra-ui/react';

export default function Home() {
  const [monsters, setMonsters] = useState(null);
  const [searchField, setSearchField] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setMonsters(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Looking for monsters...</p>;
  if (!monsters) return <p>No monsters around here</p>;
  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchField);
  });

  onSearchChange = (event) => {
    var searchField = event.target.value.toLocaleLowerCase();
    setSearchField(searchField);
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Monsters.js!</a>
          </h1>

          <p className={styles.description}>
            <Input
              htmlSize={4}
              width="320px"
              placeholder="Search for a monster"
              onChange={onSearchChange}
            />
          </p>

          <div className={styles.grid}>
            {filteredMonsters.map((monster) => {
              return (
                <a
                  key={monster.name}
                  href="https://nextjs.org/docs"
                  className={styles.card}
                >
                  <h2>{monster.name} &rarr;</h2>
                  <p>{monster.phone}</p>
                </a>
              );
            })}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}
