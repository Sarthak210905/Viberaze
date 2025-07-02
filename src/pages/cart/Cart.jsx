import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateQuantity, fetchCart, applyCoupon } from "../../redux/cartSlice";
import { toast } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Trash, ShoppingCart, Plus, Minus, Tag as CouponIcon } from "lucide-react";
import myContext from '../../context/data/myContext';

function Cart() {
  const dispatch = useDispatch();
  const { items: cartItems, discount, freeShipping, isLoading: cartLoading } = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));
  const { product: products } = useContext(myContext);
  
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleDelete = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Item removed from cart");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ item, quantity: item.quantity - 1 }));
    } else {
      handleDelete(item);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() !== '') {
      dispatch(applyCoupon({ couponCode, cartItems }));
    } else {
      toast.error("Please enter a coupon code.");
    }
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);
  const shipping = cartSubtotal > 0 && cartSubtotal < 1499 && !freeShipping ? 50 : 0;
  const grandTotal = cartSubtotal - (Number(discount) || 0) + shipping;

  // Helper to get latest stock for a cart item
  const getLatestStock = (item) => {
    const prod = products.find(p => p.id === item.id);
    return prod ? Number(prod.stock) : Number(item.stock);
  };

  // Check if any cart item is out of stock
  const hasOutOfStock = cartItems.some(item => getLatestStock(item) === 0);

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login to proceed");
      return;
    }

    if (!formData.name || !formData.address || !formData.pincode || !formData.phoneNumber) {
      toast.error("Please fill all required shipping fields");
      return;
    }

    const options = {
      key: "rzp_live_h5TxxrfT6f0vrZ",
      key_secret: "Nh6YC5dgChx38ozY0mqOZqjg",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: `order_rcptid_${Date.now()}`,
      name: "Viberaze",
      description: "Payment for your order",
      handler: async function (response) {
        try {
          setIsLoading(true);
          const paymentId = response.razorpay_payment_id;

          const orderInfo = {
            cartItems,
            addressInfo: `${formData.name}, ${formData.address}, ${formData.pincode}`,
            phoneNumber: formData.phoneNumber,
            date: new Date().toLocaleString(),
            email: user.user?.email || user.email,
            userid: user.user?.uid || user.uid,
            paymentId,
            status: "processing",
            totalAmount: grandTotal,
            orderDate: new Date().toISOString(),
          };

          const orderRef = collection(fireDB, "orders");
          await addDoc(orderRef, orderInfo);

          // Send email notifications to customer and admin
          try {
            await fetch('https://<your-region>-<your-project-id>.cloudfunctions.net/sendOrderEmail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerEmail: user.user?.email || user.email,
                adminEmail: 'viberaze.vr@gmail.com', // TODO: Replace with your admin email
                orderInfo: orderInfo,
              }),
            });
          } catch (emailError) {
            console.error('Failed to send order emails:', emailError);
          }

          toast.success("Order placed successfully!");

          cartItems.forEach((item) => {
            dispatch(deleteFromCart(item.id));
          });
          setFormData({ name: "", address: "", pincode: "", phoneNumber: "" });

          setTimeout(() => {
            window.location.href = "/order";
          }, 1500);
        } catch (error) {
          console.error("Order processing error:", error);
          toast.error("Failed to process order. Please try again.");
        } finally {
          setIsLoading(false);
        }
      },
      prefill: {
        name: formData.name,
        email: user.user?.email || user.email,
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#000000",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  if (cartLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-pulse bg-gray-200 rounded-xl w-96 h-64" />
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="h-screen flex flex-col items-center justify-center bg-white">
          <div className="bg-gray-100 p-8 rounded-full mb-6">
            <ShoppingCart size={48} className="text-black" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-black">Your cart is empty</h2>
          <p className="text-gray-600 text-center max-w-md">
            Looks like you haven't added anything yet. Start shopping to fill it up!
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 px-4 md:px-12">
        <h1 className="text-4xl font-extrabold text-center text-black mb-12 tracking-tight">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items & Summary */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-black/10 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md">
              {cartItems.map((item, idx) => {
                const latestStock = getLatestStock(item);
                const isOutOfStock = latestStock === 0;
                return (
                  <div key={item.id + (item.selectedSize || '') + (item.selectedColor || '')} className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 group transition-all duration-200 hover:bg-black/5 gap-4 sm:gap-6">
                    <div className="relative flex-shrink-0">
                      <img src={item.imageUrls[0]} alt={item.title} className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl shadow-lg border border-black/10 transform transition-transform duration-300 group-hover:scale-105" />
                      {isOutOfStock && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">Out of Stock</span>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-extrabold text-lg sm:text-xl text-black mb-2 truncate">{item.title}</h3>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        {item.selectedSize && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-600">Size:</span>
                            <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-medium">{item.selectedSize}</span>
                          </div>
                        )}
                        {item.selectedColor && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-600">Color:</span>
                            <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-medium">{item.selectedColor}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm sm:text-base">
                        {item.salePrice ? (
                          <>
                            <span className="line-through text-gray-400">₹{item.price}</span>
                            <span className="font-bold text-black ml-2 text-base sm:text-lg">₹{item.salePrice}</span>
                          </>
                        ) : (
                          <span className="font-bold text-black text-base sm:text-lg">₹{item.price}</span>
                        )}
                      </p>
                      {isOutOfStock && (
                        <p className="text-xs text-red-500 font-semibold mt-1">This product is out of stock and cannot be purchased.</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleDecrement(item)} className="p-1.5 sm:p-2 border border-black rounded-full bg-white hover:bg-black hover:text-white transition-all" disabled={isOutOfStock}>
                          <Minus size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <span className="mx-2 sm:mx-4 font-bold text-lg sm:text-xl min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => handleIncrement(item)} className="p-1.5 sm:p-2 border border-black rounded-full bg-white hover:bg-black hover:text-white transition-all" disabled={isOutOfStock}>
                          <Plus size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <button onClick={() => handleDelete(item)} className="text-black hover:text-red-600 transition-all p-1.5 sm:p-2 rounded-full border border-transparent hover:border-red-600">
                        <Trash size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Coupon Section */}
            <div className="mt-8 p-4 border border-black rounded-lg">
              <h3 className="font-bold text-lg text-black mb-2">Apply Coupon</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Checkout Details */}
          <div className="lg:col-span-1">
            <div className="p-6 border border-black rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-black border-b border-black pb-2">Order Summary</h2>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-black">₹{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold text-black">{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Discount</span>
                  <span className="font-bold">- ₹{(Number(discount) || 0).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold border-t border-black pt-2">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="p-6 border border-black rounded-lg mt-8 space-y-4">
              <h2 className="text-xl font-bold text-black border-b border-black pb-2">Shipping Information</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border border-black rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 border border-black rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full p-2 border border-black rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full p-2 border border-black rounded-lg" required />
              </div>
              <button
                type="submit"
                disabled={isLoading || hasOutOfStock}
                onClick={() => {
                  if (hasOutOfStock) {
                    toast.error('Some items in your cart are out of stock. Please remove them to proceed.');
                    return;
                  }
                  handleBuyNow();
                }}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 mt-6"
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
