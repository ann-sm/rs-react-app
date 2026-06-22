import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ann-sm-pokemons';

function useLocalStorage(): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      return data || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value);
    }
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
