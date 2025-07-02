import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Policy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-lg">
              Your privacy and data protection is our top priority
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
            <div className="prose max-w-none">
              <div className="mb-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  This Privacy Policy describes how we collect, use, and protect your information 
                  when you use our services. We are committed to ensuring your privacy is protected 
                  and handle your personal data in accordance with applicable laws and regulations.
                </p>
                <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                  <strong>Last Updated:</strong> January 2025
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      We collect information that you provide directly to us, including your name, 
                      email address, postal address, telephone number, and payment information when 
                      you make a purchase or create an account.
                    </p>
                    <p>
                      We also automatically collect certain information about your device and usage 
                      patterns, including IP address, browser type, operating system, referring URLs, 
                      and pages visited to improve our services and user experience.
                    </p>
                    <p>
                      Information may also be collected through cookies, web beacons, and other 
                      tracking technologies to enhance your browsing experience and provide 
                      personalized content.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      We use the information we collect to provide, maintain, and improve our services, 
                      process transactions, and communicate with you about your account and our services.
                    </p>
                    <p>
                      Your information may also be used to personalize your experience, send you marketing 
                      communications (with your consent), respond to your inquiries, and comply with legal 
                      obligations.
                    </p>
                    <p>
                      We may use aggregated and anonymized data for analytics purposes to understand 
                      user behavior and improve our website functionality and performance.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      We do not sell, trade, or rent your personal information to third parties. 
                      We may share your information with trusted service providers who assist us in 
                      operating our website, conducting business, or servicing you.
                    </p>
                    <p>
                      These service providers are bound by confidentiality agreements and are only 
                      authorized to use your information as necessary to provide services to us.
                    </p>
                    <p>
                      We may also disclose your information when required by law, to protect our rights, 
                      property, or safety, or in connection with a business transfer or merger.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security and Storage</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      We implement appropriate technical and organizational security measures to protect 
                      your personal information against unauthorized access, alteration, disclosure, or 
                      destruction.
                    </p>
                    <p>
                      This includes encryption, secure servers, regular security assessments, and access 
                      controls. However, no method of transmission over the internet or electronic storage 
                      is 100% secure.
                    </p>
                    <p>
                      While we strive to protect your information using commercially acceptable means, 
                      we cannot guarantee absolute security and encourage you to use strong passwords 
                      and secure networks.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      You have the right to access, update, correct, or delete your personal information. 
                      You may also request a copy of the personal information we hold about you or 
                      restrict the processing of your information under certain circumstances.
                    </p>
                    <p>
                      You can opt out of receiving promotional communications from us at any time by 
                      following the unsubscribe instructions in our emails or contacting us directly.
                    </p>
                    <p>
                      Please note that you may still receive transactional emails related to your 
                      account, orders, and important service updates even if you opt out of marketing 
                      communications.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      We use cookies and similar tracking technologies to collect and store information 
                      about your preferences and browsing behavior to enhance your user experience.
                    </p>
                    <p>
                      You can control cookie settings through your browser preferences, though disabling 
                      cookies may affect the functionality of certain features on our website.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for 
                    the privacy practices or content of these external sites. We encourage you to review 
                    the privacy policies of any third-party sites you visit.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our services are not intended for children under the age of 13. We do not knowingly 
                    collect personal information from children under 13. If you are a parent or guardian 
                    and believe your child has provided us with personal information, please contact us.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your 
                    country of residence. We ensure appropriate safeguards are in place to protect your 
                    information in accordance with applicable data protection laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices 
                    or legal requirements. We will notify you of any material changes by posting the updated 
                    policy on this page and updating the "Last Updated" date. Your continued use of our 
                    services after such changes constitutes acceptance of the updated policy.
                  </p>
                </section>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Questions About This Privacy Policy?
                </h3>
                <p className="text-gray-600 mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full 
                  hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Contact Us
                </Link>
                <div className="mt-6 text-sm text-gray-500">
                  <p>Email: viberaze.vr@gmail.com</p>
                  {/* <p>Phone: +1 (555) 123-4567</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policy;