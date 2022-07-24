import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import styles from './Sort.module.scss'

export enum SortVariants {
  DESC, ASC
}

interface SortProps {
  sort: SortVariants;
  setSort(sort: SortVariants): void;
}

export function Sort({ sort, setSort }: SortProps) {
  const handleChange = (value: SortVariants) => {
    setSort(value);
  };

  return (
    <FormControl className={styles.control} component="fieldset">
      <FormLabel className={styles.label}>
        Sort by payments
      </FormLabel>
      <RadioGroup
        className={styles.group}
        aria-label="sorting"
        name="radio-buttons-group"
        onChange={(_, value) => handleChange(Number(value) as SortVariants)}
      >
        <FormControlLabel value={SortVariants.DESC} control={<Radio />} label="desc" />
        <FormControlLabel value={SortVariants.ASC} control={<Radio />} label="asc" />
      </RadioGroup>
    </FormControl>
  );
}
