'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

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
      <div className="input-group group relative">
        <input id="searchProducts" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products" className="relative border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base focus-visible:outline-none" />
        <div className="absolute flex items-center justify-center right-0 top-0 bottom-0 pointer-events-none p-2 px-3 opacity-100 group-focus-within:opacity-0 transition-opacity">
          <Search className="size-4" />
        </div>
      </div>
    </form>
  );
}
