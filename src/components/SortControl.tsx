import React, { useEffect } from 'react';

type SortOption = 'dateAsc' | 'dateDesc' | 'titleAsc' | 'titleDesc';

interface SortControlProps<T> {
  items: T[];
  sortBy: SortOption;
  onSort: (sortedItems: T[]) => void;
  compareFn: (a: T, b: T, sortBy: SortOption) => number;
}

const SortControl = <T,>({ items, sortBy, onSort, compareFn }: SortControlProps<T>) => {
  useEffect(() => {
    console.log('SortControl effect triggered');
    const sortedItems = [...items].sort((a, b) => compareFn(a, b, sortBy));
    onSort(sortedItems);
  }, [items, sortBy, compareFn, onSort]); // Stable dependencies

  return null;
};

export default SortControl;
