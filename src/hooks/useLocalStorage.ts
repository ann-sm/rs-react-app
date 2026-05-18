import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ann-sm-pokemons';

function useLocalStorage(): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEY) || '';
    return data || '';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, value);
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
