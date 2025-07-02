import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-gray-300 text-lg">
              Please read these terms carefully before using our services
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
            <div className="prose max-w-none">
              <div className="mb-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Welcome to Viberaze. These Terms and Conditions ("Terms") govern your use of our website 
                  and services. By accessing or using our website, you agree to be bound by these Terms.
                </p>
                <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                  <strong>Last Updated:</strong> January 2025
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    By using this website, you accept these terms and conditions in full. If you disagree 
                    with these terms and conditions or any part of these terms and conditions, you must 
                    not use this website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Website Content</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>The content of our website is subject to change without notice.</p>
                    <p>
                      We do not provide any warranty or guarantee as to the accuracy, timeliness, 
                      performance, completeness, or suitability of the information and materials 
                      found on this website for any particular purpose.
                    </p>
                    <p>
                      You acknowledge that such information and materials may contain inaccuracies 
                      or errors, and we expressly exclude liability for any such inaccuracies or 
                      errors to the fullest extent permitted by law.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Website</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      Your use of any information or materials on our website is entirely at your own risk, 
                      for which we shall not be liable.
                    </p>
                    <p>
                      You must not use this website in any way that causes, or may cause, damage to the 
                      website or impairment of the availability or accessibility of the website.
                    </p>
                    <p>
                      You must not use this website to copy, store, host, transmit, send, use, publish, 
                      or distribute any material which consists of spyware, computer virus, Trojan horse, 
                      worm, keystroke logger, rootkit, or other malicious software.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      Unless otherwise stated, we or our licensors own the intellectual property rights 
                      in the website and material on the website.
                    </p>
                    <p>
                      Our website contains material owned by or licensed to us. This material includes, 
                      but is not limited to, the design, layout, look, appearance, and graphics. 
                      Reproduction is prohibited other than in accordance with the copyright notice.
                    </p>
                    <p>
                      All trademarks reproduced on our website which are not the property of, or licensed 
                      to, the operator are acknowledged on the website.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                    and protect your information when you use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      We shall be under no liability whatsoever in respect of any loss or damage arising 
                      directly or indirectly out of the decline of authorization for any transaction.
                    </p>
                    <p>
                      In no event shall Viberaze be liable for any direct, indirect, punitive, incidental, 
                      special, consequential damages or any other damages resulting from the use of our website.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws 
                    of India. Any dispute arising out of use of our website is subject to the jurisdiction 
                    of Indian courts.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may revise these terms and conditions from time to time. Revised terms and conditions 
                    will apply to the use of this website from the date of publication of the revised terms 
                    and conditions on this website. Please check this page regularly to ensure you are 
                    familiar with the current version.
                  </p>
                </section>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Questions About These Terms?
                </h3>
                <p className="text-gray-600 mb-6">
                  If you have any questions about these Terms and Conditions, please contact us.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full 
                  hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;