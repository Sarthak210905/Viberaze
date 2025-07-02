import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Heart, Share2, ArrowLeft, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { toggleWishlistItem } from '../../redux/wishlistSlice';

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;
  const [product, setProduct] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const autoSlideInterval = 10000; // 3 seconds
  const sliderRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      const productData = productTemp.data();
      setProduct(productData);
      setSelectedImage(productData.imageUrls[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Auto slider effect
  useEffect(() => {
    if (!product.imageUrls || product.imageUrls.length <= 1) return;
    if (isHovered) return;
    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => {
        const next = (prev + 1) % product.imageUrls.length;
        setSelectedImage(product.imageUrls[next]);
        return next;
      });
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [product.imageUrls, isHovered]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + value));
    setQuantity(newQuantity);
  };

  const addCart = (product) => {
    if (!selectedSize || !selectedColor) {
      return toast.error("Please select a size and color");
    }
    const item = { ...product, selectedSize, selectedColor, quantity };
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleImageChange = (url, index) => {
    setSelectedImage(url);
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 px-4 md:px-12">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center gap-1 text-black hover:text-gray-700"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Products</span>
            <span className="text-gray-400">/</span>
            <span className="text-black font-bold">{product.title}</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images - Left Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Main Image */}
              <div
                className="aspect-square mb-4 overflow-hidden rounded-2xl bg-white border-2 border-gray-300 shadow-2xl max-w-md mx-auto flex items-center justify-center"
                ref={sliderRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Thumbnail Images */}
              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center mt-2">
                  {product.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(url, index)}
                      className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-gray-300 ring-2 ring-gray-300' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <img 
                        src={url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Product Details - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-300">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase mb-2 text-gray-500">
                    {product.brand || 'Viberaze'}
                  </p>
                  <h1 className="text-2xl font-extrabold mb-2 text-black border-b border-black pb-2">
                    {product.title}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => dispatch(toggleWishlistItem(product))}
                    className={`p-2 rounded-full border border-black ${isInWishlist ? 'bg-red-50 text-red-500' : 'text-black hover:bg-black hover:text-white'} transition`}
                  >
                    <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-2xl font-extrabold text-black">₹{product.salePrice || product.price}</span>
                  {product.salePrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">{Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF</span>
                    </>
                  )}
                  {Number(product.stock) > 0 && Number(product.stock) <= 5 && (
                    <span className="text-orange-600 font-semibold ml-2">Only {product.stock} left!</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                {Number(product.stock) === 0 && (
                  <p className="text-sm text-red-500 font-medium mt-2">⚠ Out of Stock</p>
                )}
              </div>
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold mb-3 text-black">Color: {selectedColor && <span className="font-normal text-gray-500">{selectedColor}</span>}</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 border-black transition-all relative ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full border border-black"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-black">Size: {selectedSize && <span className="font-normal text-gray-500">{selectedSize}</span>}</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-800 underline">Size Guide</button>
                </div>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-bold border-2 border-black rounded-lg min-w-[44px] transition-colors ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 text-black">Quantity</h3>
                <div className="flex items-center">
                  <div className="flex items-center border-2 border-black rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 text-black hover:bg-black hover:text-white rounded-l-lg transition"
                      disabled={quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 font-bold min-w-[50px] text-center text-black">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 text-black hover:bg-black hover:text-white rounded-r-lg transition"
                      disabled={quantity >= 10}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
              {/* Add to Cart Button */}
              <button
                onClick={() => addCart(product)}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors mt-6"
                disabled={Number(product.stock) === 0}
              >
                {Number(product.stock) === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              {Number(product.stock) === 0 && (
                <p className="text-sm text-red-500 font-medium mt-2">
                  ⚠ Out of Stock
                </p>
              )}
              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Free shipping on orders above ₹999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Easy 30 days return & exchange</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">100% authentic products</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Details Tabs */}
            <div className="mt-12">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-300">
                {/* Tab Headers */}
                <div className="flex border-b-2 border-gray-300">
                  {['description', 'specifications', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-bold capitalize transition-colors border-b-2 ${activeTab === tab ? 'text-black border-black' : 'text-gray-400 border-transparent hover:text-black'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'description' && (
                    <div className="prose max-w-none">
                      <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
                    </div>
                  )}
                  {activeTab === 'specifications' && (
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">
                        <div className="grid grid-cols-2 gap-4">
                          <div><strong>Material:</strong> 100% Cotton</div>
                          <div><strong>Fit:</strong> Regular</div>
                          <div><strong>Sleeve:</strong> Short Sleeve</div>
                          <div><strong>Pattern:</strong> Printed</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="text-sm text-gray-600">
                      <p>Customer reviews will be displayed here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;