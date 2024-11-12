import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import { Heart, Share2, ArrowLeft, ShoppingCart, Star, StarHalf, X } from 'lucide-react';
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Custom Alert Component
const CustomAlert = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-2">
    <span className="text-gray-700">{message}</span>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [products, setProducts] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + value));
    setQuantity(newQuantity);
  };

  const addToCartHandler = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (products.colors && products.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    dispatch(addToCart({
      ...products,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    }));
    toast.success("Added to cart successfully!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: products.title,
        text: products.description,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,

        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareAlert(true);
      setTimeout(() => setShowShareAlert(false), 3000);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back button */}
          <button onClick={() => window.history.back()} className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>

          {products && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Product Images */}
                <div className="md:w-1/2 p-6">
                  {products.imageUrls && (
                    <Carousel
                      additionalTransfrom={0}
                      arrows
                      autoPlay
                      autoPlaySpeed={3000}
                      centerMode={false}
                      className="rounded-lg overflow-hidden"
                      containerClass="container-with-dots"
                      dotListClass="custom-dot-list-style"
                      draggable
                      infinite
                      keyBoardControl
                      responsive={{
                        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 }
                      }}
                      showDots
                      swipeable
                    >
                      {products.imageUrls.map((url, index) => (
                        <div key={index} className="aspect-w-1 aspect-h-1">
                          <img
                            src={url}
                            alt={`${products.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm text-indigo-600 uppercase tracking-wider font-semibold">
                        {products.brand || 'Brand Name'}
                      </h2>
                      <h1 className="text-3xl font-bold text-gray-900 mt-2">
                        {products.title}
                      </h1>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleShare}
                        className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                      >
                        <Share2 className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setIsWishlist(!isWishlist)}
                        className={`p-2 rounded-full hover:bg-gray-100 ${
                          isWishlist ? 'text-red-500' : 'text-gray-400 hover:text-gray-500'
                        }`}
                      >
                        <Heart className="w-6 h-6" fill={isWishlist ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-4">
                    <div className="flex text-yellow-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      <StarHalf className="w-5 h-5 fill-current" />
                    </div>
                    <span className="ml-2 text-gray-600">(4.5) · 42 Reviews</span>
                  </div>

                  {/* Price */}
                  <div className="mt-6">
                    <p className="text-4xl font-bold text-gray-900">₹{products.price}</p>
                    {products.oldPrice && (
                      <p className="mt-1 text-gray-500 line-through">₹{products.oldPrice}</p>
                    )}
                  </div>

                  {/* Color Selection */}
                  {products.colors && products.colors.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-900">Color</h3>
                      <div className="flex gap-2 mt-2">
                        {products.colors.map((color, i) => (
                          <button
                            key={i}
                            className={`
                              w-8 h-8 rounded-full border-2 
                              ${selectedColor === color 
                                ? 'border-indigo-500' 
                                : 'border-transparent'
                              }
                            `}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Size</h3>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          className={`
                            py-2 px-4 text-sm font-medium rounded-md
                            ${selectedSize === size
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                            }
                          `}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                    <div className="flex items-center mt-2 space-x-3">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="text-gray-900 font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Description</h3>
                    <p className="mt-2 text-gray-600 text-sm leading-6">
                      {products.description}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={addToCartHandler}
                    className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Share Alert */}
          {showShareAlert && (
            <CustomAlert 
              message="Product link copied to clipboard!"
              onClose={() => setShowShareAlert(false)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;