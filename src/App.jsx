import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';
import Policy from './pages/extra/policy';
import AboutUs from './pages/extra/about';
import ForgotPassword from './pages/registration/forgot';
import Men from './genders/men';
import Women from './genders/women';
import Terms from './pages/extra/terms';
import Cancel from './pages/extra/cancel';
import ContactUs from './pages/extra/contactus';
import ShippingPolicy from './pages/extra/shipping';
import { ProtectedRoute } from './protectedroute/ProtectedRoute';
import { ProtectedRouteForAdmin } from './protectedroute/ProtectedRouteForAdmin';
import Wishlist from './components/wishlist/Wishlist';
import Profile from './pages/profile/Profile';
import { fetchCart } from './redux/cartSlice';
import { fetchWishlist } from './redux/wishlistSlice';
import { fetchProfile } from './redux/profileSlice';
import { fetchOrders } from './redux/orderSlice';
import { fetchCoupons } from './redux/couponSlice';
import { Toaster } from 'react-hot-toast';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import InvoicePage from "./pages/invoice/InvoicePage";
import { Analytics } from "@vercel/analytics/react";
import Mens from "./components/gender/mens";
import Womens from "./genders/women";
import Kids from './genders/kids';
import Accessories from './genders/accessories';
import ProfitAndExpense from './pages/admin/page/ProfitAndExpense';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
      dispatch(fetchProfile());
      dispatch(fetchCoupons());
      
      // Handle both Firebase user object and custom user object structures
      const userEmail = user.user?.email || user.email;
      if (userEmail === 'sarthakchoukse2109@gmail.com') {
        dispatch(fetchOrders());
      }
    }
  }, [dispatch]);

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacypolicy" element={<Policy />} />
          <Route path="/returnpolicy" element={<Cancel/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/men" element={<Men/>} />
          <Route path="/women" element={<Women/>} />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgot' element={<ForgotPassword/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/productinfo/:id' element={<ProductInfo/>} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/invoice/:orderId" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />
          <Route path="/order-details/:orderId" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/men" element={<Mens />} />
          <Route path="/women" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path='/profit-expense' element={
            <ProtectedRouteForAdmin>
              <ProfitAndExpense />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster />
        <Tooltip id="my-tooltip" />
        <Analytics />
        <ToastContainer/>
      </Router>
    </MyState>
  )
}

export default App 