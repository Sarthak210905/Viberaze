import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Shipping Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping Methods and Rates</h2>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-medium mb-3 text-gray-700">Domestic Shipping</h3>
            <div className="pl-4 space-y-2">
              <h4 className="font-semibold">Standard Shipping:</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Delivery time: 5-7 business days</li>
                <li>Shipping cost: 50 rupees for orders under 1499</li>
                <li>FREE shipping on orders 1499 and above</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-medium mb-3 text-gray-700">International Shipping</h3>
            <div className="pl-4 space-y-2">
              <h4 className="font-semibold">International Standard:</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Delivery time: 10-14 business days</li>
                <li>Shipping cost: Calculated at checkout based on destination and order weight</li>
                <li>Customs and import fees are the responsibility of the customer</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Processing</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Orders are typically processed within 1-2 business days</li>
              <li>Processing times may be longer during peak seasons (holidays, sales events)</li>
              <li>You will receive a shipping confirmation email with tracking information once your order is shipped</li>
            </ul>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping Restrictions</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>We cannot ship to P.O. Boxes in some international locations</li>
              <li>Certain items may have shipping limitations due to size, weight, or local regulations</li>
              <li>Some remote or hard-to-reach locations may incur additional shipping fees</li>
            </ul>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tracking Orders</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Tracking information is sent via email immediately after shipment</li>
              <li>You can track your package using the provided tracking number on our website or the carrier's website</li>
              <li>Contact our customer service if you have not received tracking information within 2 business days of purchase</li>
            </ul>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping Damages and Returns</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Inspect your package upon delivery</li>
              <li>If items are damaged during shipping, please contact us within 48 hours of receipt</li>
              <li>Provide photos of damaged items to process a replacement or refund</li>
              <li>Refer to our Returns Policy for complete details on returns and exchanges</li>
            </ul>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h2>
          <div className="bg-white shadow-md rounded-lg p-6 text-gray-700">
            <p className="mb-2"><strong>Email:</strong> viberaze.vr@gmail.com</p>
            <p className="mb-2"><strong>Phone:</strong> 8349007721</p>
            <p><strong>Address:</strong> 113/3 Nanda Nagar, Indore, Madhya Pradesh, India</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;