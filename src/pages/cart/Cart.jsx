import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB , auth } from "../../fireabase/FirebaseConfig";
import { TrashIcon, ShoppingCartIcon, MinusIcon } from "lucide-react";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(0);
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const shipping = 50;
  const grandTotal = totalAmount + shipping - discount;


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseInt(item.price * item.quantity),
      0
    );
    setTotalAmount(total);
  };

  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item));

    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: mode === "dark" ? "dark" : "light",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [couponCode, setCouponCode] = useState("");
  // const [discount, setDiscount] = useState(0);
  const applyCoupon = () => {
    if (couponCode === "NEW13") {
      if(totalAmount > 1499){
       setDiscount(0.13 * totalAmount); // Example: 10% off
       toast.success("Coupon applied successfully!");} 
      else {
        toast.error("Add eligible item worth ₹" + (1499-totalAmount) + " more to unlock coupon");
        setDiscount(0);
      }
    } else {
      toast.error("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleBuyNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to buy items");
      return;
    }

    // Validate form data first
    if (
      !formData.name ||
      !formData.address ||
      !formData.pincode ||
      !formData.phoneNumber
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    const options = {
      key: "rzp_live_h5TxxrfT6f0vrZ",
      key_secret: "Nh6YC5dgChx38ozY0mqOZqjg",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + formData.name,
      name: "Viberaze",
      description: "for testing purpose",
      handler: async function (response) {
        try {
          setIsLoading(true);
          const paymentId = response.razorpay_payment_id;

          const orderInfo = {
            cartItems,
            addressInfo: `${formData.name}, ${formData.address}, ${formData.pincode}`,
            phoneNumber: formData.phoneNumber,
            date: new Date().toLocaleTimeString(),
            email: JSON.parse(localStorage.getItem("user")).user.email,
            userid: JSON.parse(localStorage.getItem("user")).user.uid,
            paymentId,
            status: "processing",
            totalAmount: grandTotal,
            orderDate: new Date().toISOString(),
          };

          const orderRef = collection(fireDB, "order");
          await addDoc(orderRef, orderInfo);

          toast.success("Order placed successfully!");

          // Clear cart and form data
          cartItems.forEach((item) => {
            dispatch(deleteFromCart(item));
          });
          setFormData({
            name: "",
            address: "",
            address1: "",
            pincode: "",
            phoneNumber: "",
          });

          // Redirect to orders page
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
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div
          className="h-screen flex flex-col items-center justify-center"
          style={{
            backgroundColor: mode === "dark" ? "#1a1b1e" : "rgb(248 250 252)",
            color: mode === "dark" ? "white" : "black",
          }}
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-full mb-6">
            <ShoppingCartIcon
              size={48}
              className="text-blue-500 dark:text-blue-400"
            />
          </div>
          <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            Looks like you haven't added anything yet. Start shopping to fill
            your cart with amazing products!
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen py-12"
        style={{
          backgroundColor: mode === "dark" ? "#1a1b1e" : "rgb(248 250 252)",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="space-y-5">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-white-900 rounded-xl shadow-md hover:shadow-md transition-all duration-200 overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(29 55 56)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-48 overflow-hidden">
                        <img
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              {item.title}
                            </h3>
                            <p
                              className="text-white-600 dark:text-gray-400 text-sm mb-4"
                              style={{
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <p>size : {item.size}</p>
                              <p>color : {item.color}</p>
                              price: {item.quantity} x ₹{item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteFromCart(item)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <TrashIcon size={20} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{item.salePrice ? item.salePrice * item.quantity : item.price * item.quantity}
                          </p>
                          {item.salePrice && (
                            <p className="text-gray-500 line-through">
                              ₹{item.price * item.quantity}
                            </p>
                          )}
                          {item.stock === 0 && (
                            <p className="text-red-500">Out of Stock</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-lg"
                  
                />
                <button
                  onClick={applyCoupon}
                  className="w-full  bg-blue-600 text-white py-2 rounded-xl shadow-lg "
                >
                  Apply Coupon
                </button >
              </div>

              <div
                className="bg-white dark:bg-white-800 rounded-xl shadow-md p-5 mt-4 sticky top-8"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(24 25 26)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  

                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Discount</span>
                      <span>₹{discount}</span>
                    </div>
                  
                  
                 
                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Modal
                    name={formData.name}
                    address={formData.address}
                    address1={formData.address1}
                    pincode={formData.pincode}
                    phoneNumber={formData.phoneNumber}
                    setName={(value) =>
                      handleInputChange({ target: { name: "name", value } })
                    }
                    setAddress={(value) =>
                      handleInputChange({ target: { name: "address", value } })
                    }
                    setAddress1={(value) =>
                      handleInputChange({ target: { name: "address", value } })
                    }
                    setPincode={(value) =>
                      handleInputChange({ target: { name: "pincode", value } })
                    }
                    setPhoneNumber={(value) =>
                      handleInputChange({
                        target: { name: "phoneNumber", value },
                      })
                    }
                    buyNow={handleBuyNow}
                    isLoading={isLoading}
                  />
                </div>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <ShoppingCartIcon size={16} />
                    Secure checkout powered by Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
