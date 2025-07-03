import { useContext, useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/layout/Layout'
import myContext from '../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../redux/cartSlice'
import { toggleWishlistItem } from '../redux/wishlistSlice'
import { Heart, ShoppingCart, Filter, Grid, List, Search, SlidersHorizontal, Star, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

function Kids() {
  const context = useContext(myContext)
  const { mode, product, searchkey, setSearchkey, filterPrice, setFilterPrice } = context
  
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  
  // State Management
  const [activeCategory, setActiveCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const minPrice = 0;
  const maxPrice = 5000;
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  // Product Categories for Kids
  const categories = [
    { name: 'All', value: '', count: product.filter(p => Array.isArray(p.category) ? p.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes('kids')) : typeof p.category === 'string' && typeof p.category.toLowerCase === 'function' && p.category.toLowerCase().includes('kids')).length },
    { name: 'T-Shirts', value: 't-shirt', count: product.filter(p => Array.isArray(p.category) ? p.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes('t-shirt')) : typeof p.category === 'string' && typeof p.category.toLowerCase === 'function' && p.category.toLowerCase().includes('t-shirt')).length },
    { name: 'Shirts', value: 'shirt', count: product.filter(p => Array.isArray(p.category) ? p.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes('shirt') && !c.toLowerCase().includes('t-shirt')) : typeof p.category === 'string' && typeof p.category.toLowerCase === 'function' && p.category.toLowerCase().includes('shirt') && !p.category.toLowerCase().includes('t-shirt')).length },
    { name: 'Hoodies', value: 'hoodie', count: product.filter(p => Array.isArray(p.category) ? p.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes('hoodie')) : typeof p.category === 'string' && typeof p.category.toLowerCase === 'function' && p.category.toLowerCase().includes('hoodie')).length },
    { name: 'Jackets', value: 'jacket', count: product.filter(p => Array.isArray(p.category) ? p.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes('jacket')) : typeof p.category === 'string' && typeof p.category.toLowerCase === 'function' && p.category.toLowerCase().includes('jacket')).length },
  ]

  // Sort options
  const sortOptions = [
    { label: 'Featured', value: '' },
    { label: 'Price: Low to High', value: 'priceAsc' },
    { label: 'Price: High to Low', value: 'priceDesc' },
    { label: 'Name: A to Z', value: 'nameAsc' },
    { label: 'Name: Z to A', value: 'nameDesc' },
    { label: 'Newest First', value: 'newest' }
  ]

  // Add to Cart Handler
  const addCartHandler = (product) => {
    dispatch(addToCart(product))
    toast.success('Added to Cart')
  }

  // Wishlist Handler
  const handleToggleWishlist = (item) => {
    dispatch(toggleWishlistItem(item))
  }

  // Size Filter Handler
  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  // Color Filter Handler
  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  // Filter and Sort Products (only kids products)
  const filteredProducts = product
    .filter(obj =>
      Array.isArray(obj.category)
        ? obj.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && (c.toLowerCase().includes('kids') || c.toLowerCase().includes('unisex')))
        : (typeof obj.category === 'string' && typeof obj.category.toLowerCase === 'function' && (obj.category.toLowerCase().includes('kids') || obj.category.toLowerCase().includes('unisex')))
    )
    .filter(obj => {
      if (activeCategory && activeCategory !== '') {
        return Array.isArray(obj.category)
          ? obj.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes(activeCategory))
          : typeof obj.category === 'string' && typeof obj.category.toLowerCase === 'function' && obj.category.toLowerCase().includes(activeCategory);
      }
      return true;
    })
    .filter((obj) => {
      // Search filter
      const searchMatch = typeof obj.title === 'string' && typeof searchkey === 'string' && obj.title.toLowerCase().includes(searchkey.toLowerCase())
      // Price filter
      const price = parseFloat(obj.salePrice || obj.price)
      const priceMatch = price >= priceRange[0] && price <= priceRange[1]
      // Size filter
      let sizeMatch = true
      if (selectedSizes.length > 0) {
        sizeMatch = selectedSizes.some(size => 
          (typeof obj.size === 'string' && typeof size === 'string' && obj.size.toLowerCase().includes(size.toLowerCase())) || 
          (Array.isArray(obj.sizes) && obj.sizes.some(s => typeof s === 'string' && typeof size === 'string' && s.toLowerCase().includes(size.toLowerCase())))
        )
      }
      // Color filter
      let colorMatch = true
      if (selectedColors.length > 0) {
        colorMatch = selectedColors.some(color => 
          (typeof obj.color === 'string' && typeof color === 'string' && obj.color.toLowerCase().includes(color.toLowerCase())) ||
          (Array.isArray(obj.colors) && obj.colors.some(c => typeof c === 'string' && typeof color === 'string' && c.toLowerCase().includes(color.toLowerCase()))) ||
          (typeof obj.title === 'string' && typeof color === 'string' && obj.title.toLowerCase().includes(color.toLowerCase()))
        )
      }
      return searchMatch && priceMatch && sizeMatch && colorMatch
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.salePrice || a.price)
      const priceB = parseFloat(b.salePrice || b.price)
      switch(sortBy) {
        case 'priceAsc':
          return priceA - priceB
        case 'priceDesc':
          return priceB - priceA
        case 'nameAsc':
          return a.title.localeCompare(b.title)
        case 'nameDesc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Dynamically generate available filter options from filteredProducts
  const availableSizes = [...new Set(filteredProducts.flatMap(p => p.sizes || []).filter(size => typeof size === 'string').map(size => size.toUpperCase()))];
  const availableColors = [...new Set(filteredProducts.flatMap(p => Array.isArray(p.colors) ? p.colors.filter(color => typeof color === 'string').map(color => color.toLowerCase()) : []))];
 
  const availableCategories = categories.filter(cat =>
    cat.value === '' || filteredProducts.some(p => Array.isArray(p.category)
      ? p.category.some(c => typeof c === 'string' && typeof c.toLowerCase === 'function' && c.toLowerCase().includes(cat.value))
      : typeof p.category === 'string' && typeof p.category.toLowerCase === 'function' && p.category.toLowerCase().includes(cat.value))
  );

  // ProductCard component
  function ProductCard({ item, index }) {
    const { title, price, salePrice, imageUrls, id, brand } = item
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [showSimilarColors, setShowSimilarColors] = useState(false)
    const finalPrice = salePrice || price
    const hasDiscount = salePrice && salePrice < price
    const discountPercent = hasDiscount ? Math.round(((price - salePrice) / price) * 100) : 0
    const handleImageHover = () => {
      if (imageUrls && imageUrls.length > 1) {
        setCurrentImageIndex(1)
      }
    }
    const handleImageLeave = () => {
      setCurrentImageIndex(0)
    }
    const isInWishlist = wishlistItems.some(item => item.id === id)
    return (
      <div className="aspect-[3/4] w-44 xs:w-48 relative mx-auto shadow-md">
        <div className="relative group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {/* Product Image Container */}
          <div 
            className="relative overflow-hidden bg-white rounded-lg cursor-pointer aspect-[3/4] w-44 xs:w-48 relative mx-0 xs:mx-auto"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            onClick={() => window.location.href = `/productinfo/${id}`}
          >
            {/* Wishlist Button - Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleWishlist(item);
              }}
              className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 z-10 ${
                isInWishlist 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:text-blue-500 hover:bg-gray-100'
              } shadow-sm`}
            >
              <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
            </button>
            {/* Sale Badge - Top Left */}
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                -{discountPercent}%
              </div>
            )}
            {/* Out of Stock Badge */}
            {Number(item.stock) === 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded z-10">
                Out of Stock
              </span>
            )}
            {/* Product Image */}
            <div className="aspect-[3/4] w-44 xs:w-48 relative mx-0 xs:mx-auto">
              {imageUrls && imageUrls.length > 0 && (
                <>
                  <img
                    src={imageUrls[currentImageIndex] || imageUrls[0]}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    onLoad={() => setIsImageLoaded(true)}
                    draggable="false"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {!isImageLoaded && (
                    <div className={`absolute inset-0 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
                  )}
                </>
              )}
            </div>
            {/* Similar Colors Button */}
            <div 
              className={`absolute bottom-2 left-2 ${mode === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded px-2 py-1 flex items-center text-xs cursor-pointer hover:${mode === 'dark' ? 'bg-gray-600' : 'bg-gray-50'} shadow-sm`}
              onClick={(e) => {
                e.stopPropagation();
                setShowSimilarColors(!showSimilarColors);
              }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-1"></div>
              <span className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>VIEW SIMILAR</span>
            </div>
          </div>
          {/* Product Info - Myntra Style */}
          <div className="mt-2 px-1 pb-3">
            {/* Brand */}
            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
              {brand || 'Viberaze'}
            </h3>
            {/* Product Title */}
            <h4 className="text-sm text-gray-600 mb-2 line-clamp-2 leading-tight">
              {title}
            </h4>
            {/* Price */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-900">
                ₹{finalPrice}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{price}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    ({discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>
            {/* Rating */}
            {Number(item.stock) === 0 && (
            <div className="mt-1">
              <span className="text-orange-600 font-semibold text-xs ml-2">Out Of Stock</span>
            </div>
          )}
          
            {Number(item.stock) > 0 && Number(item.stock) <= 5 && (
              <div className="mt-1">
                <span className="text-orange-600 font-semibold text-xs ml-2">Only {item.stock} left!</span>
              </div>
            )}
             {Number(item.stock) > 0 && Number(item.stock) >= 5 && (
              <div className="mt-1">
                <span className="text-green-600 font-semibold text-xs ml-2"> In Stock </span>
              </div>
            )}

          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="w-full px-6 sm:px-8">
          {/* Header */}
          <div className="mb-3 mt-4">
            {/* Breadcrumb Path */}
            <div className="mb-3">
              <nav className="flex items-center space-x-2 text-sm">
                <Link 
                  to="/" 
                  className={`hover:underline ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Home
                </Link>
                <span className={mode === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
                <Link 
                  to="/kids" 
                  className={`hover:underline ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Kids
                </Link>
                {activeCategory && (
                  <>
                    <span className={mode === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
                    <span className={mode === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                    </span>
                  </>
                )}
              </nav>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h1 className={`text-lg sm:text-xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Kids' Collection</h1>
                <span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>({filteredProducts.length} products)</span>
              </div>
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : mode === 'dark' 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : mode === 'dark' 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.value
                      ? 'bg-blue-500 text-white'
                      : mode === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  {category.name}
                  <span className={`ml-1 text-xs ${
                    activeCategory === category.value 
                      ? 'text-gray-300' 
                      : mode === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <div className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-3 shadow-sm border ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'} sticky top-8`}>
                {/* Search Bar */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Search Products</label>
                  <div className="relative">
                    <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchkey}
                      onChange={(e) => setSearchkey(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg border transition-colors text-sm ${
                        mode === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400'
                      } focus:outline-none`}
                    />
                  </div>
                </div>
                {/* Sort Options */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-lg border transition-colors text-sm ${
                      mode === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    } focus:outline-none`}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                {/* Price Range */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Price Range</label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs">₹{priceRange[0]}</span>
                    <div className="flex-1 px-2">
                      <Slider
                        range
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange}
                        onChange={setPriceRange}
                        trackStyle={[{ backgroundColor: '#facc15' }]}
                        handleStyle={[{ borderColor: '#facc15' }, { borderColor: '#facc15' }]}
                        railStyle={{ backgroundColor: '#e5e7eb' }}
                      />
                    </div>
                    <span className="text-xs">₹{priceRange[1]}</span>
                  </div>
                </div>
                {/* Size Filter */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-2 py-2 text-sm rounded-lg border transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : mode === 'dark'
                              ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                              : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Color Filter */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-colors relative ${
                          selectedColors.includes(color)
                            ? 'border-blue-500 scale-110'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      >
                        {selectedColors.includes(color) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Clear Filters Button */}
                <button 
                  onClick={() => {
                    setSearchkey('')
                    setActiveCategory('')
                    setPriceRange([minPrice, maxPrice])
                    setSortBy('')
                    setSelectedSizes([])
                    setSelectedColors([])
                  }}
                  className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${
                    mode === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            {/* Main Products Area */}
            <div className="flex-1">
              {/* Mobile Filter Button and Search */}
              <div className="lg:hidden mb-3">
                <div className="flex gap-3">
                  {/* Mobile Search */}
                  <div className="flex-1 relative">
                    <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchkey}
                      onChange={(e) => setSearchkey(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg border transition-colors text-sm ${
                        mode === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400'
                      } focus:outline-none`}
                    />
                  </div>
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${
                      showFilters
                        ? 'bg-blue-500 text-white'
                        : mode === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                  </button>
                </div>
              </div>
              {/* Mobile Filters Drawer */}
              {showFilters && (
                <div className="lg:hidden mb-3">
                  <div className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-3 shadow-sm border ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>                    {/* Sort Options */}
                    <div className="mb-3">
                      <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-lg border transition-colors text-sm ${
                          mode === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        } focus:outline-none`}
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    {/* Price Range */}
                    <div className="mb-4">
                      <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Price Range</label>
                      <div className="flex items-center gap-4">
                        <span className="text-xs">₹{priceRange[0]}</span>
                        <div className="flex-1 px-2">
                          <Slider
                            range
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange}
                            onChange={setPriceRange}
                            trackStyle={[{ backgroundColor: '#facc15' }]}
                            handleStyle={[{ borderColor: '#facc15' }, { borderColor: '#facc15' }]}
                            railStyle={{ backgroundColor: '#e5e7eb' }}
                          />
                        </div>
                        <span className="text-xs">₹{priceRange[1]}</span>
                      </div>
                    </div>
                    {/* Size Filter */}
                    <div className="mb-3">
                      <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Size</label>
                      <div className="grid grid-cols-5 gap-2">
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-2 py-2 text-sm rounded-lg border transition-colors ${
                              selectedSizes.includes(size)
                                ? 'bg-blue-500 text-white border-blue-500'
                                : mode === 'dark'
                                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                                  : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-gray-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Color Filter */}
                    <div className="mb-3">
                      <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color</label>
                      <div className="grid grid-cols-8 gap-2">
                        {availableColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-colors relative ${
                              selectedColors.includes(color)
                                ? 'border-blue-500 scale-110'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color.charAt(0).toUpperCase() + color.slice(1)}
                          >
                            {selectedColors.includes(color) && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Clear Filters Button */}
                    <button 
                      onClick={() => {
                        setSearchkey('')
                        setActiveCategory('')
                        setPriceRange([minPrice, maxPrice])
                        setSortBy('')
                        setSelectedSizes([])
                        setSelectedColors([])
                        setShowFilters(false)
                      }}
                      className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${
                        mode === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
                
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Kids