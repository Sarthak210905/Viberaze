import { useContext, useEffect, useState } from 'react'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toggleWishlistItem } from '../../redux/wishlistSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product, searchkey, filterType, filterPrice } = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const addCartHandler = (product) => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        if (!selectedColor) {
            toast.error('Please select a color');
            return;
        }
        dispatch(addToCart({ ...product, size: selectedSize, color: selectedColor }));
        toast.success('Added to cart');
    }

    const handleToggleWishlist = (item) => {
        dispatch(toggleWishlistItem(item));
    };

    const isInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>New Arrivals</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {product
                     .filter((obj) => typeof obj.title === 'string' && obj.title.toLowerCase().includes(searchkey))
                     .filter((obj) => {
                        if (Array.isArray(obj.category)) {
                            return obj.category.some(c => typeof c === 'string' && c.toLowerCase().includes(filterType));
                        } else {
                            return typeof obj.category === 'string' && obj.category.toLowerCase().includes(filterType);
                        }
                     })
                     .filter((obj) => obj.price.includes(filterPrice))
                     .map((item, index) => {
                        const { title, price, imageUrls, id, size, colors, salePrice, stock } = item;
                        const gender = item.gender || (Array.isArray(item.category)
                          ? (item.category.find(c => /men|women|kids|accessor/i.test(c)) || '').replace(/[^a-zA-Z]/g, '').replace(/s$/, '').replace(/^./, m => m.toUpperCase())
                          : (item.category || '').replace(/[^a-zA-Z]/g, '').replace(/s$/, '').replace(/^./, m => m.toUpperCase()));
                        return (
                            <div key={index} className="w-full">
                                <div className="relative group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                                    {/* Product Image Container */}
                                    <Link to={`/productinfo/${id}`} className="block">
                                        <div className="relative overflow-hidden bg-white rounded-lg">
                                            {/* Wishlist Button - Top Right */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleWishlist(item);
                                                }}
                                                className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 z-10 ${
                                                    isInWishlist(id) 
                                                        ? 'bg-gray-900 text-white' 
                                                        : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                } shadow-sm`}
                                            >
                                                <Heart size={16} className={isInWishlist(id) ? 'fill-current' : ''} />
                                            </button>
                                    
                                            {/* Sale Badge - Top Left */}
                                    {salePrice && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                                            {Math.round(((price - salePrice) / price) * 100)}% OFF
                                        </div>
                                    )}

                                    {/* Stock Badge */}
                                    {stock === 0 && (
                                                <div className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                                            Out of Stock
                                        </div>
                                    )}

                                    {/* Product Image */}
                                            <div className="aspect-[3/4] relative">
                                                {imageUrls && imageUrls.length > 0 && (
                                                    <>
                                                <img 
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                                                            src={imageUrls[0]} 
                                                            alt={title}
                                                            title={title}
                                                            draggable="false"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                />
                                                        {imageUrls.length > 1 && (
                                                            <img 
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out absolute inset-0 opacity-0 group-hover:opacity-100" 
                                                                src={imageUrls[1]} 
                                                                alt={`${title}-hover`}
                                                                title={`${title}-hover`}
                                                                draggable="false"
                                                                loading="lazy"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                    </div>
                                    </Link>
                                    
                                    {/* Product Info - Myntra Style */}
                                    <div className="mt-2 px-1 pb-3">
                                        {/* Brand */}
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                                            Viberaze
                                        </h3>
                                        
                                        {/* Product Title */}
                                        <h4 className="text-sm text-gray-600 mb-2 line-clamp-2 leading-tight">
                                            {gender && (
                                                <span className="inline-block mb-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-black-100 text-black-800 border border-black-300">
                                                    {gender}
                                                </span>
                                            )}
                                            {title}
                                        </h4>
                                        
                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-1">
                                            {salePrice ? (
                                                <>
                                                    <span className="text-sm font-semibold text-gray-900">₹{salePrice}</span>
                                                    <span className="text-sm text-gray-500 line-through">₹{price}</span>
                                                    <span className="text-xs text-green-600 font-medium">
                                                        ({Math.round(((price - salePrice) / price) * 100)}% OFF)
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-sm font-semibold text-gray-900">₹{price}</span>
                                            )}
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs font-medium">
                                                <span>4.2</span>
                                                <Star size={10} className="ml-1 fill-current" />
                                            </div>
                                            <span className="text-xs text-gray-500">(2.5k)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProductCard