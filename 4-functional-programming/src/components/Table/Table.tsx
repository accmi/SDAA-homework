import { Table as MuiTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FiltersByPosts } from '../Filters';
import { SortVariants } from '../Sort';

import styles from './Table.module.scss'

export interface Row {
  avatar: string
  username: string
  country: string
  name: string
  lastPayments: number
  posts: number
}

interface TableProps {
  rows: Row[];
  query: string;
  sort: SortVariants;
  filters: FiltersByPosts[];
}

export function Table({ rows, query, sort, filters }: TableProps) {

  const getFilteredRows = (): Row[] => {
    return [...rows]
      .sort((a, b) => {
        if (sort === SortVariants.DESC) {
          return b.lastPayments - a.lastPayments;
        }

        return a.lastPayments - b.lastPayments;
      })
      .filter(row => {
        let filtersResult: boolean[] = [];

        if (query) {
          const queryFiltering = row.country.toLowerCase().includes(query.toLowerCase()) ||
            row.name.toLowerCase().includes(query.toLowerCase()) ||
            row.username.toLowerCase().includes(query.toLowerCase());

          filtersResult = [...filtersResult, queryFiltering]
        }

        if (filters?.length > 0) {
          const postsFilterResult = filters
            .some(filter => filter === FiltersByPosts.MORE_THEN_100 ? row.posts > 100 : row.posts === 0);

          filtersResult = [...filtersResult, postsFilterResult];
        }

        return filtersResult.length > 0 ? filtersResult.some(f => f) : true;
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableBackground}>
        <MuiTable className={styles.root} sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.bold}>Avatar</TableCell>
              <TableCell className={styles.bold} align="left">
                Username
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Country
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Name
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Last Payments
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Posts
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredRows().map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">
                  <img
                    className={styles.avatar}
                    src={row.avatar}
                    alt="avatar"
                  />
                </TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.country}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.lastPayments}</TableCell>
                <TableCell align="left">{row.posts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </div>
    </div>
  );
}
