import { memo, useMemo } from 'react';
import { List, type RowComponentProps, useDynamicRowHeight } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import styles from './country-list.module.css';

type RowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

const Row = ({ index, style, countries, selectedYear, selectedColumns }: RowComponentProps<RowProps>) => {
  const country = countries[index];
  return (
    <div style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

Row.displayName = 'CountryRow';


export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const populationMap = useMemo(() => {
    const map = new Map<string, number>();
    countries.forEach((country) => {
      const yearDataMap = createYearDataMap(country.data);
      map.set(
        country.id,
        getPopulationForYear(yearDataMap, selectedYear) ?? 0
      );
    });
    return map;
  }, [countries, selectedYear]);
    
  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => {
        const matchesSearch = c.id
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesRegion =
          !selectedRegion ||
          c.data.some((d) => d.region === selectedRegion);

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc'
            ? a.id.localeCompare(b.id)
            : b.id.localeCompare(a.id);
        }

        const popA = populationMap.get(a.id) ?? 0;
        const popB = populationMap.get(b.id) ?? 0;

        return sortOrder === 'asc'
          ? popA - popB
          : popB - popA;
      });
  }, [
    countries,
    searchQuery,
    selectedRegion,
    sortField,
    sortOrder,
    populationMap
  ]);

  const RowData = useMemo<RowProps>(
    () => ({
      countries: filteredCountries,
      selectedYear,
      selectedColumns,
    }),
    [filteredCountries, selectedYear, selectedColumns]
  );
  
  const rowHeight = useDynamicRowHeight({ defaultRowHeight: 350 });

  return (
    <div className={styles.countryList}>
      <List
        rowComponent={Row}
        rowCount={filteredCountries.length}
        rowHeight={rowHeight}
        rowProps={RowData}
      />
    </div>
  );
});

CountryList.displayName = 'CountryList';
