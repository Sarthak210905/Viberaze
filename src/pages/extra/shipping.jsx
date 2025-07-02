import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Shipping Policy
            </h1>
            <p className="text-gray-300 text-lg">
              Everything you need to know about our shipping process
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
            <div className="space-y-12">
              {/* Shipping Methods */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Shipping Methods & Rates
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Domestic Shipping (India)
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Standard Delivery</span>
                        <span className="text-gray-600">5-7 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Shipping Fee</span>
                        <span className="text-gray-600">₹50 (orders under ₹1,499)</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Free Shipping</span>
                        <span className="text-green-600 font-semibold">Orders ₹1,499+</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      International Shipping
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Standard International</span>
                        <span className="text-gray-600">10-14 business days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Shipping Cost</span>
                        <span className="text-gray-600">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Customs Fees</span>
                        <span className="text-gray-600">Customer responsibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order Processing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Order Processing
                </h2>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Order Placed</h3>
                      <p className="text-sm text-gray-600">You receive confirmation email immediately</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
                      <p className="text-sm text-gray-600">1-2 business days (longer during peak seasons)</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Shipped</h3>
                      <p className="text-sm text-gray-600">Tracking information sent via email</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tracking Orders */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Order Tracking
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600">
                        <strong>Tracking Information:</strong> Sent via email immediately after shipment
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600">
                        <strong>Track Your Order:</strong> Use the provided tracking number on our website or carrier's website
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600">
                        <strong>No Tracking Info?</strong> Contact us if you haven't received tracking within 2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Shipping Restrictions */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Shipping Restrictions
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">P.O. Box delivery may not be available for some international locations</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">Certain items may have shipping limitations due to size, weight, or regulations</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">Remote locations may incur additional shipping fees</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Damages and Issues */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Shipping Damages & Issues
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-3">Important: Inspect Your Package</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-red-800">
                        <strong>Upon Delivery:</strong> Inspect your package immediately for any damage
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-red-800">
                        <strong>Report Damage:</strong> Contact us within 48 hours if items are damaged during shipping
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-red-800">
                        <strong>Documentation:</strong> Provide photos of damaged items to process replacement or refund
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Shipping Support
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Contact Our Shipping Team</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Email Support</h4>
                      <p className="text-gray-300">viberaze.vr@gmail.com</p>
                      <p className="text-sm text-gray-400">Response within 24 hours</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Phone Support</h4>
                      <p className="text-gray-300">+91 8349007721</p>
                      <p className="text-sm text-gray-400">Mon-Fri, 10AM-6PM IST</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="font-medium mb-2">Business Address</h4>
                    <p className="text-gray-300">
                      Indore<br />
                      Madhya Pradesh, India
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                This shipping policy is effective as of January 2025 and may be updated periodically. 
                Please check this page for the most current information.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;