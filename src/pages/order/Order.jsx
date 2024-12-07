import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

const OrderStatus = ({ status }) => {
  const statusConfig = {
    processing: {
      color: "text-yellow-500",
      icon: Clock,
      text: "Processing",
      progress: 33,
    },
    shipped: {
      color: "text-blue-500",
      icon: Truck,
      text: "Shipped",
      progress: 66,
    },
    delivered: {
      color: "text-green-500",
      icon: CheckCircle,
      text: "Delivered",
      progress: 100,
    },
  };

  const StatusIcon = statusConfig[status]?.icon || Package;
  const statusColor = statusConfig[status]?.color || "text-gray-500";
  const statusText = statusConfig[status]?.text || "Order Placed";
  const progress = statusConfig[status]?.progress || 0;

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center gap-2 ${statusColor}`}>
        <StatusIcon size={20} />
        <span className="font-medium">{statusText}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full ${statusColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const OrderCard = ({ order, mode }) => {
  const date = new Date(order.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full mb-6">
      <div
        className="rounded-lg p-6 shadow-md"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "white",
          color: mode === "dark" ? "white" : "inherit",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
            <p className="font-medium">{order.paymentId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Order Date
            </p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          {order.cartItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 py-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.imageUrls[0]}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Size: {item.size} | Quantity: {item.quantity}
                </p>
                {item.salePrice ? (
                  <p className="font-semibold mt-1">
                    Sale Price: ₹{item.salePrice * item.quantity}
                  </p>
                ) : (
                  <p className="font-semibold mt-1">
                    ₹{item.price * item.quantity}
                  </p>
                )}
                {item.stock === 0 && (
                  <p className="text-red-500">Out of Stock</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <OrderStatus status={order.status || "processing"} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
              <p className="text-xl font-bold">
                ₹
                {order.cartItems.reduce(
                  (acc, item) => acc + (item.price * item.quantity + 50),
                  0
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Shipping Address: {order.addressInfo}
          </div>
          {order.trackingInfo && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Tracking Number: {order.trackingInfo.trackingNumber}</p>
              <p>Carrier: {order.trackingInfo.carrier}</p>
              <a
                href={order.trackingInfo.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Track your order
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderList = ({ orders, mode }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1
      className="text-2xl font-bold mb-6"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      Your Orders
    </h1>
    <div className="space-y-6">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} mode={mode} />
      ))}
    </div>
  </div>
);

const Order = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.uid;
  const { mode, loading, orders } = useContext(myContext); // Changed 'order' to 'orders'

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (!orders || orders.length === 0) { // Changed 'order' to 'orders'
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Package size={48} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 text-center">
            No Orders Found
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
            When you make a purchase, your orders will appear here
          </p>
        </div>
      </Layout>
    );
  }

  const userOrders = orders.filter((obj) => obj.userid === userId); // Changed 'order' to 'orders'

  return (
    <Layout>
      <OrderList orders={userOrders} mode={mode} />
    </Layout>
  );
};

export default Order;
