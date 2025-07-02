import React, { useContext, useState } from 'react'
import Filter from '../../components/filter/Filter'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

function Allproducts() {
  const { product, searchkey, filterType, filterPrice, mode, loading } = useContext(myContext)
  // State for Men-style layout
  const minPrice = 0;
  const maxPrice = 5000;
  const [search, setSearch] = useState(searchkey || '')
  const [sortBy, setSortBy] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  // Categories for navigation (extract from products)
  const categories = Array.from(new Set(product.flatMap(p => Array.isArray(p.category) ? p.category : [p.category]).filter(Boolean).map(c => c.toLowerCase()))).map(cat => ({ name: cat.charAt(0).toUpperCase() + cat.slice(1), value: cat }))
  categories.unshift({ name: 'All', value: '' })
  const [activeCategory, setActiveCategory] = useState('')
  // Available sizes/colors
  const availableSizes = [...new Set(product.flatMap(p => p.sizes || []).map(size => size.toUpperCase()))]
  const availableColors = [...new Set(product.flatMap(p => p.colors || []).map(color => color.toLowerCase()))]
  // Filtering logic
  const filteredProducts = product
    .filter(obj =>
      !activeCategory || (Array.isArray(obj.category)
        ? obj.category.some(c => typeof c === 'string' && c.toLowerCase().includes(activeCategory))
        : typeof obj.category === 'string' && obj.category.toLowerCase().includes(activeCategory))
    )
    .filter(obj => typeof obj.title === 'string' && typeof search === 'string' && obj.title.toLowerCase().includes(search.toLowerCase()))
    .filter(obj => {
      const price = parseFloat(obj.salePrice || obj.price)
      return price >= priceRange[0] && price <= priceRange[1]
    })
    .filter(obj => {
      if (selectedSizes.length === 0) return true
      return selectedSizes.some(size =>
        (typeof obj.size === 'string' && typeof size === 'string' && obj.size.toLowerCase().includes(size.toLowerCase())) ||
        (Array.isArray(obj.sizes) && obj.sizes.some(s => typeof s === 'string' && typeof size === 'string' && s.toLowerCase().includes(size.toLowerCase())))
      )
    })
    .filter(obj => {
      if (selectedColors.length === 0) return true
      return selectedColors.some(color =>
        (typeof obj.color === 'string' && typeof color === 'string' && obj.color.toLowerCase().includes(color.toLowerCase())) ||
        (Array.isArray(obj.colors) && obj.colors.some(c => typeof c === 'string' && typeof color === 'string' && c.toLowerCase().includes(color.toLowerCase())))
      )
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.salePrice || a.price)
      const priceB = parseFloat(b.salePrice || b.price)
      switch (sortBy) {
        case 'priceAsc': return priceA - priceB
        case 'priceDesc': return priceB - priceA
        case 'nameAsc': return a.title.localeCompare(b.title)
        case 'nameDesc': return b.title.localeCompare(a.title)
        default: return 0
      }
    })

  const handleProductClick = (id) => {
    window.location.href = `/productinfo/${id}`
  }

  if (loading) {
    return (
      <Layout>
        <div className={`min-h-screen transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`rounded-xl overflow-hidden shadow-sm border animate-pulse ${mode === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-100'}`} style={{height: '340px'}} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 ">
          {/* Header */}
          <div className="mb-3 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h1 className={`text-lg sm:text-xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>All Products</h1>
                <span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>({filteredProducts.length} products)</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-900 text-white' : mode === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>Grid</button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-900 text-white' : mode === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>List</button>
              </div>
            </div>
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category.value ? 'bg-gray-900 text-white' : mode === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'} border ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  {category.name}
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
                    <input type="text" placeholder="Search for products..." value={search} onChange={e => setSearch(e.target.value)} className={`w-full pl-9 pr-3 py-2.5 rounded-lg border transition-colors text-sm ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400'} focus:outline-none`} />
                  </div>
                </div>
                {/* Sort Options */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sort By</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border transition-colors text-sm ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none`}>
                    <option value="">Featured</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="nameAsc">Name: A to Z</option>
                    <option value="nameDesc">Name: Z to A</option>
                  </select>
                </div>
                {/* Price Range */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Price Range</label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs">₹{priceRange[0]}</span>
                    <div className="flex-1 px-2">
                      <Slider range min={minPrice} max={maxPrice} value={priceRange} onChange={setPriceRange} trackStyle={[{ backgroundColor: '#facc15' }]} handleStyle={[{ borderColor: '#facc15' }, { borderColor: '#facc15' }]} railStyle={{ backgroundColor: '#e5e7eb' }} />
                    </div>
                    <span className="text-xs">₹{priceRange[1]}</span>
                  </div>
                </div>
                {/* Size Filter */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((size) => (
                      <button key={size} onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])} className={`px-2 py-2 text-sm rounded-lg border transition-colors ${selectedSizes.includes(size) ? 'bg-gray-900 text-white border-gray-900' : mode === 'dark' ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`}>{size}</button>
                    ))}
                  </div>
                </div>
                {/* Color Filter */}
                <div className="mb-3">
                  <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableColors.map((color) => (
                      <button key={color} onClick={() => setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color])} className={`w-7 h-7 rounded-full border-2 transition-colors relative ${selectedColors.includes(color) ? 'border-gray-900 scale-110' : 'border-gray-300 hover:border-gray-500'}`} style={{ backgroundColor: color }} title={color.charAt(0).toUpperCase() + color.slice(1)}>{selectedColors.includes(color) && (<div className="absolute inset-0 flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>)}</button>
                    ))}
                  </div>
                </div>
                {/* Clear Filters Button */}
                <button onClick={() => { setSearch(''); setActiveCategory(''); setPriceRange([minPrice, maxPrice]); setSortBy(''); setSelectedSizes([]); setSelectedColors([]); }} className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${mode === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Clear All Filters</button>
              </div>
            </div>
            {/* Main Products Area */}
            <div className="flex-1">
              {/* Products Grid */}
              <div className="mb-3">
                {filteredProducts.length === 0 ? (
                  <div className={`text-center py-6 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="mb-4">No products found</div>
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className={`grid gap-1 sm:gap-1 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredProducts.map((item, index) => {
                      const { brand, title, price, salePrice, stock } = item;
                      const finalPrice = salePrice || price;
                      const hasDiscount = salePrice && salePrice < price;
                      const discountPercent = hasDiscount ? Math.round(((price - salePrice) / price) * 100) : 0;
                      return (
                        <div key={item.id || index} className="aspect-[3/4] w-48 relative mx-auto">
                          <div className="relative group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out ">
                            {/* Product Image Container */}
                            <div 
                              className="relative overflow-hidden bg-white rounded-lg cursor-pointer aspect-[3/4] w-48 relative"
                onClick={() => handleProductClick(item.id)}
                            >
                              {/* Wishlist, Sale Badge, etc. can be added here if needed */}
                  {item.imageUrls && item.imageUrls[0] ? (
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                  draggable="false"
                                  loading="lazy"
                                  onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                                <div className={`w-full h-full flex items-center justify-center ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}><span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No Image</span></div>
                  )}
                </div>
                {/* Content */}
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
                              {/* <div className="flex items-center gap-1">
                                <div className="flex items-center bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs font-medium">
                                  <span>4.2</span>
                                  <Star size={10} className="ml-1 fill-current" />
                                </div>
                                <span className="text-xs text-gray-500">(2.5k)</span>
                              </div> */}

                            
                              {Number(stock) > 0 && Number(stock) <= 5 && (
                                <div className="mt-1">
                                  <span className="text-orange-600 font-semibold text-xs ml-2">Only {stock} left!</span>
                                </div>
                              )}
                               {Number(stock) > 0 && Number(stock) >= 5 && (
                                <div className="mt-1">
                                  <span className="text-green-600 font-semibold text-xs ml-2"> In Stock </span>
                                </div>
                              )}
                            </div>
                </div>
              </div>
                      )
                    })}
          </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Allproducts