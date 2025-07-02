import React, { useContext } from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toggleWishlistItem } from '../../redux/wishlistSlice';
import myContext from '../../context/data/myContext';
import Layout from '../layout/Layout';
import PropTypes from 'prop-types';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const removeFromWishlist = (product) => {
    dispatch(toggleWishlistItem(product));
  };

  const addToCartFromWishlist = (product) => {
    const cartItem = {
      ...product,
      quantity: 1,
      size: product.sizes?.[0] || product.size || 'M',
      color: product.colors?.[0] || product.color || 'Default',
    };
    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-black">
          <div className="bg-red-50 p-8 rounded-full mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.653 0-3.094.936-3.812 2.25-.718-1.314-2.159-2.25-3.812-2.25C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-center">Your Wishlist is Empty</h2>
          <p className="text-gray-600 text-center max-w-md mb-8 text-lg leading-relaxed">
            Discover amazing products and save your favorites here. Start exploring our collection!
          </p>
          <Link
            to="/allproducts"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-black">
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-9 h-9 text-red-500'><path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.653 0-3.094.936-3.812 2.25-.718-1.314-2.159-2.25-3.812-2.25C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' /></svg>
                  My Wishlist
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Myntra-style Wishlist Grid */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlistItems.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow border border-gray-100 max-w-[200px] mx-auto flex flex-col"
              >
                {/* Image with link */}
                <div className="relative">
                  <Link to={`/productinfo/${product.id}`}>
                    <img
                      src={product.imageUrl || (product.imageUrls && product.imageUrls[0])}
                      alt={product.title}
                      className="w-full aspect-[3/4] object-cover rounded-t-lg"
                      draggable="false"
                    />
                  </Link>
                  {/* Remove icon */}
                  <button
                    onClick={() => removeFromWishlist(product)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} className="text-gray-500" />
                  </button>
                </div>
                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between p-2">
                  <p className="font-bold text-xs mb-1 truncate">{product.title}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">₹{product.salePrice || product.price}</span>
                    {product.salePrice && (
                      <>
                        <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                        <span className="text-xs text-red-500 font-semibold">
                          ({Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                  {/* Move to Bag */}
                  <button
                    onClick={() => addToCartFromWishlist(product)}
                    disabled={Number(product.stock) === 0}
                    className="w-full mt-1 bg-gray-900 text-white rounded py-1 text-xs font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {Number(product.stock) === 0 ? 'Out of Stock' : 'MOVE TO BAG'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Wishlist.propTypes = {
  // Add any props if needed
};

export default Wishlist;