import { Search, Filter as FilterIcon, RotateCcw, ChevronDown } from 'lucide-react';
import { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';

const Filter = () => {
    const context = useContext(myContext);
    const { 
        mode, 
        product, 
        searchkey, 
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice
    } = context;

    const [isExpanded, setIsExpanded] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const isDark = mode === 'dark';
    
    // Get unique categories
    const categories = [...new Set(product.map(item => item.category))].filter(Boolean);

    const handleReset = () => {
        setSearchkey('');
        setFilterType('');
        setFilterPrice('');
        setPriceRange({ min: '', max: '' });
    };

    const handlePriceFilter = () => {
        if (priceRange.min || priceRange.max) {
            setFilterPrice(`${priceRange.min}-${priceRange.max}`);
        } else {
            setFilterPrice('');
        }
    };

    return (
        <div className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
            isDark 
                ? 'bg-gray-900/90 border-gray-800' 
                : 'bg-white/90 border-gray-200'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                                isDark 
                                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <FilterIcon className="h-4 w-4" />
                                <span className="font-medium">Filters</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Filter Content */}
                    <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1 min-w-0">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchkey}
                                    onChange={(e) => setSearchkey(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-0 text-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-offset-0 ${
                                        isDark 
                                            ? 'bg-gray-800 text-white focus:ring-blue-500' 
                                            : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
                                    }`}
                                    placeholder="Search products..."
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative min-w-0 lg:w-48">
                                <select 
                                    value={filterType} 
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className={`w-full rounded-lg border-0 text-sm transition-all duration-200 focus:ring-2 focus:ring-offset-0 py-2.5 px-3 ${
                                        isDark 
                                            ? 'bg-gray-800 text-white focus:ring-blue-500' 
                                            : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
                                    }`}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="flex items-center space-x-2 min-w-0">
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({...prev, min: e.target.value}))}
                                    onBlur={handlePriceFilter}
                                    className={`w-20 rounded-lg border-0 text-sm transition-all duration-200 focus:ring-2 focus:ring-offset-0 py-2.5 px-3 ${
                                        isDark 
                                            ? 'bg-gray-800 text-white focus:ring-blue-500' 
                                            : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
                                    }`}
                                    placeholder="Min"
                                />
                                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>-</span>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({...prev, max: e.target.value}))}
                                    onBlur={handlePriceFilter}
                                    className={`w-20 rounded-lg border-0 text-sm transition-all duration-200 focus:ring-2 focus:ring-offset-0 py-2.5 px-3 ${
                                        isDark 
                                            ? 'bg-gray-800 text-white focus:ring-blue-500' 
                                            : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
                                    }`}
                                    placeholder="Max"
                                />
                            </div>

                            {/* Reset Button */}
                            <button 
                                onClick={handleReset}
                                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                                    isDark 
                                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                            >
                                <RotateCcw className="h-4 w-4" />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;