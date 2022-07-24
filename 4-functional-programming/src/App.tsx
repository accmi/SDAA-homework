import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search, FiltersByPosts, SortVariants } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account } from '../types';

import rows from './mocks/rows.json';

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => {
  return users.reduce((rows: Row[], user) => {
    const userImage = images.find((image) => image.userID === user.userID);
    const account = accounts.find((account) => account.userID === user.userID);
    const row = {
      avatar: userImage.url,
      username: user.username,
      country: user.country,
      name: user.name,
      lastPayments: account.payments.reduce((acc, payment) => acc + payment.totalSum, 0),
      posts: account.posts,
    };

    return [...rows, row];
  }, []);
};

function App() {
  const [data, setData] = useState<Row[]>([]);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<SortVariants>();
  const [filters, setFilters] = useState<FiltersByPosts[]>([]);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) =>
        setData(dataConverter(users, accounts, images))
    );
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters filters={filters} setFilters={setFilters} />
            <Sort sort={sort} setSort={setSort} />
          </div>
          <Search query={query} setQuery={setQuery} />
        </div>
        <Table rows={data || mockedData} query={query} sort={sort} filters={filters} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
