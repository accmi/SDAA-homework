import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';

export enum FiltersByPosts {
  WITHOUT, MORE_THEN_100,
}

type optionType = {
  title: string;
  type: FiltersByPosts;
};

interface FiltersProps {
  filters: FiltersByPosts[];
  setFilters(filter: FiltersByPosts[]): void;
}

const OPTIONS: optionType[] = [
  {
    title: 'Without posts',
    type: FiltersByPosts.WITHOUT,
  },
  {
    title: 'More than 100 posts',
    type: FiltersByPosts.MORE_THEN_100,
  },
];

export function Filters({ filters, setFilters }: FiltersProps) {
  const onChange = (option: optionType) => {
    let updatedFilters: FiltersByPosts[];

    if (filters?.some((filter) => filter === option.type)) {
      updatedFilters = filters?.filter(
        (filter) => filter !== option.type
      );
    } else {
      updatedFilters = filters ? [...filters, option.type] : [option.type];
    }

    setFilters(updatedFilters);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map((option) => (
          <li
            value={option.title}
            onClick={() => onChange(option)}
            key={option.title}
          >
            <Checkbox
              checked={filters?.some((filter) => filter === option.type)}
              value={option.title}
              onChange={() => onChange(option)}
              size="small"
              color="primary"
            />{' '}
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
