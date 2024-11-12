import React, { useState } from 'react';
import { Search, Filter as FilterIcon, RefreshCw } from 'lucide-react';

const Filter = ({ 
    mode = 'light',
    searchKey = '', 
    setSearchKey = () => {},
    filterType = '',
    setFilterType = () => {},
    sortBy = '',
    setSortBy = () => {},
    priceRange = [0, 1000],
    setPriceRange = () => {},
    products = []
}) => {
    const isDark = mode === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-gray-200' : 'text-gray-800';
    const inputBg = isDark ? 'bg-gray-700' : 'bg-gray-50';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

    const handleMinPriceChange = (e) => {
        const newMin = Math.min(Number(e.target.value), priceRange[1]);
        setPriceRange([newMin, priceRange[1]]);
    };

    const handleMaxPriceChange = (e) => {
        const newMax = Math.max(Number(e.target.value), priceRange[0]);
        setPriceRange([priceRange[0], newMax]);
    };

    const handleReset = () => {
        setPriceRange([0, 1000]);
        setSortBy('');
        setFilterType('');
        setSearchKey('');
    };

    return (
        <div className={`rounded-xl ${bgColor} ${textColor} shadow-lg border ${borderColor} transition-all duration-300 p-6`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <FilterIcon className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <button 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${textColor}`}
                    onClick={handleReset}
                >
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset</span>
                </button>
            </div>

            <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg ${inputBg} border-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm transition-all duration-300 ${textColor}`}
                        placeholder="Search products..."
                    />
                </div>

                {/* Category Filter */}
                <div className="relative flex-1">
                    <select 
                        value={filterType} 
                        onChange={(e) => setFilterType(e.target.value)}
                        className={`w-full rounded-lg ${inputBg} border-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm transition-all duration-300 ${textColor} p-3`}
                    >
                        <option value="">All Categories</option>
                        {products.map((item, index) => (
                            <option key={index} value={item.category}>{item.category}</option>
                        ))}
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={handleMinPriceChange}
                            min="0"
                            max="1000"
                            className={`w-full rounded-lg ${inputBg} border-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm transition-all duration-300 ${textColor} p-3`}
                            placeholder="Min"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={handleMaxPriceChange}
                            min="0"
                            max="1000"
                            className={`w-full rounded-lg ${inputBg} border-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm transition-all duration-300 ${textColor} p-3`}
                            placeholder="Max"
                        />
                    </div>
                </div>

                {/* Sort Filter */}
                <div className="relative flex-1">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`w-full rounded-lg ${inputBg} border-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm transition-all duration-300 ${textColor} p-3`}
                    >
                        <option value="">Select ordering</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filter;