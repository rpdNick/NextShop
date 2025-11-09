'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('search value:', query);
    // TODO: додати логіку запиту до бекенду

    setQuery('');
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="searchProducts" className="invisible hidden">
        Search
      </label>
      <input id="searchProducts" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products" className="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base focus-visible:outline-none" />
    </form>
  );
}
