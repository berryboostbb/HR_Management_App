// SearchContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface SearchContextType {
  searchActive: boolean;
  setSearchActive: (value: boolean) => void;

  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  return (
    <SearchContext.Provider
      value={{ searchActive, setSearchActive, searchText, setSearchText }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('useSearch must be used within a SearchProvider');
  return context;
};
