import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/layout/Layout'
import myContext from '../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../redux/cartSlice'
import { FaHeart, FaShoppingCart, FaFilter } from 'react-icons/fa'

function Women() {
  const context = useContext(myContext)
  const { mode, product, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context
  
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)
  
  // State Management
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Product Categories
  const categories = [
    { name: 'All', value: '' },
    { name: 'Tops', value: 'top' },
    { name: 'Dresses', value: 'dress' },
    { name: 'Ethnic Wear', value: 'ethnic' },
    { name: 'Accessories', value: 'accessory' },
  ]

  // Wishlist Toggle
  const toggleWishlist = (item) => {
    setWishlist(prev => 
      prev.some(wishItem => wishItem.id === item.id)
        ? prev.filter(wishItem => wishItem.id !== item.id)
        : [...prev, item]
    );
    toast.success(wishlist.some(wishItem => wishItem.id === item.id) 
      ? 'Removed from Wishlist' 
      : 'Added to Wishlist'
    );
  }

  // Add to Cart Handler
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to Cart');
  }

  // Remove from Cart Handler
  const removeCart = (product) => {
    dispatch(deleteFromCart(product));
    toast.error('Removed from Cart');
  }

  // Filter and Sort Products
  const filteredProducts = product
    .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
    .filter((obj) => activeCategory === '' || obj.category.toLowerCase().includes(activeCategory))
    .filter((obj) => filterPrice === '' || obj.price <= parseFloat(filterPrice))
    .sort((a, b) => {
      switch(sortBy) {
        case 'priceAsc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'priceDesc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'nameAsc':
          return a.title.localeCompare(b.title);
        case 'nameDesc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update localStorage for cart and wishlist
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cartItems, wishlist]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          {/* Category Navigation */}
          <div className="flex flex-wrap space-x-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.value)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                  activeCategory === category.value 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Sort By</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
            </select>

            {/* Filter Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
            >
              <FaFilter />
            </button>
          </div>
        </div>

        {/* Filters (if showFilters is true) */}
        {showFilters && (
          <div className="mb-8 p-4 bg-gray-100 rounded-lg">
            {/* Add your filter components here */}
            <div className="flex space-x-4">
              <input 
                type="text" 
                placeholder="Search products"
                value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)}
                className="px-4 py-2 border rounded-lg flex-grow"
              />
              <input 
                type="number" 
                placeholder="Max Price"
                onChange={(e) => setFilterPrice(e.target.value)}
                className="px-4 py-2 border rounded-lg w-32"
              />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <section className="text-gray-600 body-font">
          <div className="container mx-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-2xl text-gray-500 py-12">
                No products found
              </div>
            ) : (
              <div className="flex flex-wrap -m-4">
                {filteredProducts.map((item, index) => {
                  const { title, price, imageUrls, id } = item;
                  const isInWishlist = wishlist.some(wishItem => wishItem.id === id);
                  const isInCart = cartItems.some(cartItem => cartItem.id === id);

                  return (
                    <div 
                      key={index} 
                      className="p-4 md:w-1/4 w-full group"
                    >
                      <div 
                        className="h-full border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 relative"
                        style={{ 
                          backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', 
                          color: mode === 'dark' ? 'white' : '' 
                        }}
                      >
                       

                        {/* Product Image */}
                        <div 
                          className="w-full aspect-square overflow-hidden cursor-pointer"
                          onClick={() => window.location.href = `/productinfo/${id}`}
                        >
                          {imageUrls && imageUrls.length > 0 && (
                            <img 
                              src={imageUrls[0]} 
                              alt={title} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-6 border-t-2">
                          <h2 className="text-xs tracking-widest text-gray-400 mb-1">
                            Viberaze
                          </h2>
                          <h1 className="text-lg font-medium text-gray-900 mb-3">
                            {title}
                          </h1>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-pink-600">
                              ₹{price}
                            </span>
                            <div className="flex space-x-2">
                              {isInCart ? (
                                <button 
                                  onClick={() => removeCart(item)}
                                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                  Remove
                                </button>
                              ) : (
                                <button 
                                  onClick={() => addCart(item)}
                                  className="px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center"
                                >
                                  <FaShoppingCart className="mr-2" /> Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Women;