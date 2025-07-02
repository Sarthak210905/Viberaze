import React, { useState, useEffect, useContext } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import PropTypes from 'prop-types';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { product } = useContext(myContext);
  const safeProducts = Array.isArray(product) ? product : [];

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length > 0) {
      setIsSearching(true);
      const words = term.split(/\s+/);
      const filtered = safeProducts.filter(product => {
        const text = [product.title, product.description, product.category]
          .map(x => typeof x === 'string' ? x.toLowerCase() : '')
          .join(' ');
        return words.every(word => text.includes(word));
      });
      setFilteredProducts(filtered);
      setIsSearching(false);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, safeProducts]);

  return (
    <div className="relative">
      {/* Minimal Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 pl-9 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      </div>

      {/* Minimal Search Results Dropdown */}
      {searchTerm.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded shadow z-40 max-h-72 overflow-y-auto">
          {isSearching ? (
            <div className="p-3 text-center text-gray-400 text-sm">Searching...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="p-1">
              {filteredProducts.slice(0, 5).map((product, index) => (
                <Link
                  key={index}
                  to={`/productinfo/${product.id}`}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setSearchTerm('')}
                >
                  <img
                    src={product.imageUrl || (product.imageUrls && product.imageUrls[0])}
                    alt={product.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{product.title}</h4>
                    <p className="text-xs text-gray-500">₹{product.price}</p>
                  </div>
                </Link>
              ))}
              {filteredProducts.length > 5 && (
                <div className="p-2 text-center border-t border-gray-100">
                  <Link
                    to={`/allproducts?search=${searchTerm}`}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                    onClick={() => setSearchTerm('')}
                  >
                    View all {filteredProducts.length} results
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 text-center text-gray-400 text-sm">
              No products found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  // Add any props if needed
};

export default SearchBar; 