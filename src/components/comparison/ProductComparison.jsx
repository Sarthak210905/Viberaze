import React, { useState, useEffect, useContext } from 'react';
import { X, Plus, ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';
import PropTypes from 'prop-types';

const ProductComparison = () => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const { mode, products } = useContext(myContext);
  const dispatch = useDispatch();

  // Helper function to safely get user ID
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.user?.uid || user.uid) : null;
  };

  useEffect(() => {
    loadComparisonItems();
  }, []);

  const loadComparisonItems = () => {
    const savedItems = localStorage.getItem('comparison_items');
    if (savedItems) {
      setComparisonItems(JSON.parse(savedItems));
    }
  };

  const addToComparison = (product) => {
    const updatedItems = [...comparisonItems];
    if (!updatedItems.find(item => item.id === product.id)) {
      if (updatedItems.length >= 4) {
        toast.error('You can compare up to 4 products at a time');
        return;
      }
      updatedItems.push(product);
      setComparisonItems(updatedItems);
      localStorage.setItem('comparison_items', JSON.stringify(updatedItems));
      toast.success('Product added to comparison');
    } else {
      toast.error('Product already in comparison');
    }
  };

  const removeFromComparison = (productId) => {
    const updatedItems = comparisonItems.filter(item => item.id !== productId);
    setComparisonItems(updatedItems);
    localStorage.setItem('comparison_items', JSON.stringify(updatedItems));
    toast.success('Product removed from comparison');
  };

  const clearComparison = () => {
    setComparisonItems([]);
    localStorage.removeItem('comparison_items');
    toast.success('Comparison cleared');
  };

  const addToCartFromComparison = (product) => {
    const cartItem = {
      ...product,
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Default'
    };
    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
  };

  const addToWishlist = (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }

    const userId = getUserId();
    const savedWishlist = localStorage.getItem(`wishlist_${userId}`);
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    if (wishlist.find(item => item.id === product.id)) {
      toast.error('Product already in wishlist');
      return;
    }

    wishlist.push(product);
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
    toast.success('Added to wishlist');
  };

  const renderSpecificationRow = (specName, getValue) => (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">
        {specName}
      </td>
      {comparisonItems.map((product) => (
        <td key={product.id} className="px-4 py-3 text-center">
          {getValue(product)}
        </td>
      ))}
    </tr>
  );

  if (comparisonItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Comparison Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowComparison(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Compare ({comparisonItems.length})
        </button>
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Product Comparison
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={clearComparison}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowComparison(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left font-medium text-gray-700 bg-gray-50">
                          Features
                        </th>
                        {comparisonItems.map((product) => (
                          <th key={product.id} className="px-4 py-3 text-center font-medium text-gray-700 bg-gray-50">
                            <div className="relative">
                              <button
                                onClick={() => removeFromComparison(product.id)}
                                className="absolute -top-2 -right-2 text-gray-400 hover:text-red-500"
                              >
                                <X size={16} />
                              </button>
                              <div className="w-32 mx-auto">
                                <img
                                  src={product.imageUrl}
                                  alt={product.title}
                                  className="w-full h-32 object-cover rounded mb-2"
                                />
                                <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                  {product.title}
                                </h4>
                                <div className="flex items-center justify-center gap-1 mb-3">
                                  {product.salePrice ? (
                                    <>
                                      <span className="text-lg font-bold text-red-600">
                                        ₹{product.salePrice}
                                      </span>
                                      <span className="text-sm text-gray-500 line-through">
                                        ₹{product.price}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-lg font-bold">
                                      ₹{product.price}
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => addToCartFromComparison(product)}
                                    className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                  >
                                    <ShoppingCart size={12} />
                                  </button>
                                  <button
                                    onClick={() => addToWishlist(product)}
                                    className="px-2 py-1 border border-gray-300 text-gray-600 text-xs rounded hover:bg-gray-50"
                                  >
                                    <Heart size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {renderSpecificationRow('Price', (product) => (
                        <div>
                          {product.salePrice ? (
                            <>
                              <div className="text-red-600 font-bold">₹{product.salePrice}</div>
                              <div className="text-gray-500 line-through text-sm">₹{product.price}</div>
                            </>
                          ) : (
                            <div className="font-bold">₹{product.price}</div>
                          )}
                        </div>
                      ))}
                      
                      {renderSpecificationRow('Category', (product) => (
                        <span className="capitalize">{product.category}</span>
                      ))}
                      
                      {renderSpecificationRow('Availability', (product) => (
                        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      ))}
                      
                      {renderSpecificationRow('Rating', (product) => (
                        <div className="flex items-center justify-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span>4.5</span>
                        </div>
                      ))}
                      
                      {renderSpecificationRow('Description', (product) => (
                        <div className="text-sm text-gray-600 line-clamp-3">
                          {product.description}
                        </div>
                      ))}
                      
                      {renderSpecificationRow('Sizes', (product) => (
                        <div className="text-sm">
                          {product.sizes?.join(', ') || 'N/A'}
                        </div>
                      ))}
                      
                      {renderSpecificationRow('Colors', (product) => (
                        <div className="text-sm">
                          {product.colors?.join(', ') || 'N/A'}
                        </div>
                      ))}
                      
                      {renderSpecificationRow('Actions', (product) => (
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/productinfo/${product.id}`}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => addToCartFromComparison(product)}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ProductComparison.propTypes = {
  // Add any props if needed
};

export default ProductComparison; 