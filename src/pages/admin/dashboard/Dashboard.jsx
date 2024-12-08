import React, { useContext } from 'react';
import { FaUserTie, FaShoppingBag, FaShoppingCart, FaUsers } from 'react-icons/fa';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import myContext from '../../../context/data/myContext';
import { useDispatch } from 'react-redux';
import { UpdateShippingStatus} from '../../../redux/status';

function Dashboard() {
  const context = useContext(myContext);
  const { mode, product, order, user } = context;
  const dispatch = useDispatch();

  const handleUpdateShippingStatus = (orderId, newStatus) => {
    dispatch(UpdateShippingStatus({ id: orderId, shippingStatus: newStatus }));
  };

  const handleUpdateDeliveryStatus = (orderId, newStatus) => {
    dispatch(UpdateDeliveryStatus({ id: orderId, deliveryStatus: newStatus }));
  };

  // Ensure order is defined before using reduce
  const totalRevenue = order?.reduce((acc, curr) => {
    return acc + curr.cartItems.reduce((itemAcc, item) => {
      return itemAcc + (item.price * item.quantity);
    }, 0);
  }, 0) || 0;

  const dashboardStats = [
    {
      icon: <FaShoppingBag size={40} />,
      title: "Total Products",
      value: product?.length || 0,
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <FaShoppingCart size={40} />,
      title: "Total Orders",
      value: order?.length || 0,
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FaUsers size={40} />,
      title: "Total Users",
      value: user?.length || 0,
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <FaUserTie size={40} />,
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const StatCard = ({ stat }) => (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-90`} />
        
        {/* Content */}
        <div className="relative p-6 text-white">
          <div className="w-12 h-12 mb-4 opacity-90">
            {stat.icon}
          </div>
          
          <h2 className="text-4xl font-bold mb-2 tracking-tight">
            {stat.value}
          </h2>
          
          <p className="text-lg font-medium opacity-90">
            {stat.title}
          </p>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-black/10 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          {/* Stats Grid */}
          <div className="flex flex-wrap -m-4">
            {dashboardStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Dashboard Tab Section */}
          <div className="mt-12">
            <DashboardTab />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;