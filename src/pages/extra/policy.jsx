import React from 'react';

const Policy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Privacy Policy
      </h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We collect information that you provide directly to us, including your name, email address, 
            shipping address, payment information, and any other information you choose to provide.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect to process your orders, communicate with you, and improve 
            our services. We may also use your information to send you marketing communications, subject 
            to your preferences.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            3. Information Sharing
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell or rent your personal information to third parties. We may share your 
            information with service providers who assist us in operating our website and conducting 
            our business.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            4. Data Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement appropriate security measures to protect your personal information. However, 
            no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            5. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, correct, or delete your personal information. You may also 
            opt out of receiving marketing communications from us at any time.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            6. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about our Privacy Policy, please contact us at privacy@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;