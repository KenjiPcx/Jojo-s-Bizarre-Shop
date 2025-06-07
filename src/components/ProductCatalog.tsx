'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export function ProductCatalog() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.jojoReference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Rarity filter
    if (rarityFilter !== 'all') {
      filtered = filtered.filter(product => product.rarity === rarityFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rarity':
          const rarityOrder = { common: 1, rare: 2, legendary: 3, godly: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'menacing':
          return b.menacingLevel - a.menacingLevel;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, rarityFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setRarityFilter('all');
    setSortBy('name');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 animate-pulse">
          JOJO'S BIZARRE BAZAAR
        </h1>
        <p className="text-xl text-purple-300 italic">
          "Your next line is... 'I need to buy everything here!'"
        </p>
        <div className="text-sm text-gray-400 mt-2">
          ゴゴゴゴ MENACING DEALS AHEAD ゴゴゴゴ
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-lg mb-8 border border-yellow-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">
              Search Products
            </label>
            <Input
              placeholder="Search JoJo merchandise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border-purple-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">
              Category
            </label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-black/50 border-purple-500 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-purple-500">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="stand">Stands</SelectItem>
                <SelectItem value="figure">Figures</SelectItem>
                <SelectItem value="manga">Manga</SelectItem>
                <SelectItem value="cosplay">Cosplay</SelectItem>
                <SelectItem value="artifact">Artifacts</SelectItem>
                <SelectItem value="limited">Limited Edition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">
              Rarity
            </label>
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="bg-black/50 border-purple-500 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-purple-500">
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="godly">Godly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black/50 border-purple-500 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-purple-500">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
                <SelectItem value="menacing">Menacing Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={clearFilters}
              variant="outline"
              className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center mb-6">
        <span className="text-lg text-purple-300">
          Found {filteredProducts.length} bizarre products
        </span>
        {filteredProducts.length === 0 && (
          <div className="text-xl text-red-400 mt-4">
            "NANI?! No products found! Even Speedwagon is afraid!"
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Footer Message */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500">
          <p className="text-lg text-yellow-300 italic">
            "Remember, there are three things that I can't tolerate: kids who smoke, kids who drink alcohol, and kids who don't buy JoJo merchandise!"
          </p>
          <p className="text-sm text-gray-400 mt-2">- Jotaro Kujo (probably)</p>
        </div>
      )}
    </div>
  );
}