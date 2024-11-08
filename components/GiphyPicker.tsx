"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Grid } from '@giphy/react-components';

const gf = new GiphyFetch('pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa'); // Demo API key

interface GiphyPickerProps {
  onGifSelect: (gif: IGif) => void;
}

export function GiphyPicker({ onGifSelect }: GiphyPickerProps) {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchGifs = (offset: number) => {
    return search
      ? gf.search(search, { offset, limit: 10 })
      : gf.trending({ offset, limit: 10 });
  };

  return (
    <div className="w-full max-h-[300px] overflow-hidden rounded-xl bg-zinc-800/50">
      <div className="p-3 border-b border-white/10">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search GIFs..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-700/50 rounded-lg text-sm text-white placeholder:text-zinc-400 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        </div>
      </div>
      
      <div className="h-[240px] overflow-y-auto p-2">
        <Grid
          onGifClick={(gif, e) => {
            e.preventDefault();
            onGifSelect(gif);
          }}
          fetchGifs={fetchGifs}
          width={326}
          columns={2}
          gutter={8}
        />
      </div>
    </div>
  );
}