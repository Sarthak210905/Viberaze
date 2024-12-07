import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
const Terms = () => {
  return (
    <>
     <Navbar />
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-5xl bg-white shadow-2xl rounded-2xl p-10 font-sans text-gray-800">
          <h1 className="text-center mb-10 text-5xl font-extrabold text-blue-700">
            Terms and Conditions
          </h1>
          <div className="space-y-6 leading-loose text-gray-600 text-lg">
            <p>
              Welcome to our Terms and Conditions page. Please read these terms
              and conditions carefully before using our website. Your use of the
              website and/or purchase from us are governed by the following
              Terms and Conditions:
            </p>
            <p>
              The content of the pages of this website is subject to change
              without notice.
            </p>
            <p>
              Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness, or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors, and
              we expressly exclude liability for any such inaccuracies or errors
              to the fullest extent permitted by law.
            </p>
            <p>
              Your use of any information or materials on our website and/or
              product pages is entirely at your own risk, for which we shall not
              be liable. It shall be your own responsibility to ensure that any
              products, services, or information available through our website
              meet your specific requirements.
            </p>
            <p>
              Our website contains material owned by or licensed to us. This
              material includes, but is not limited to, the design, layout,
              look, appearance, and graphics. Reproduction is prohibited other
              than in accordance with the copyright notice, which forms part of
              these terms and conditions.
            </p>
            <p>
              All trademarks reproduced on our website which are not the
              property of, or licensed to, the operator are acknowledged on the
              website.
            </p>
            <p>
              Unauthorized use of information provided by us shall give rise to
              a claim for damages and/or be a criminal offense.
            </p>
            <p>
              From time to time, our website may also include links to other
              websites. These links are provided for your convenience to provide
              further information.
            </p>
            <p>
              You may not create a link to our website from another website or
              document without Viberaze’s prior written consent.
            </p>
            <p>
              Any dispute arising out of use of our website or purchases with us
              is subject to the laws of India.
            </p>
            <p>
              We shall be under no liability whatsoever in respect of any loss
              or damage arising directly or indirectly out of the decline of
              authorization for any Transaction, on account of the Cardholder
              having exceeded the preset limit mutually agreed by us with our
              acquiring bank from time to time.
            </p>
            <p>
              These terms and conditions govern your use of this website; by
              using this website, you accept these terms and conditions in full.
            </p>
            <p>
              Unless otherwise stated, we or our licensors own the intellectual
              property rights in the website and material on the website.
            </p>
            <p>
              You must not use this website in any way that causes, or may
              cause, damage to the website or impairment of the availability or
              accessibility of the website.
            </p>
            <p>
              Access to certain areas of this website is restricted. We reserve
              the right to restrict access to other areas of this website, or
              indeed this entire website, at our discretion.
            </p>
            <p>
              We may revise these terms and conditions from time to time.
              Revised terms and conditions will apply to the use of this website
              from the date of publication of the revised terms and conditions
              on this website.
            </p>
          </div>
          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-blue-500 text-white text-lg rounded-full shadow-md 
                        hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              <Link to={"/contact"} className="text-white">
                Contact Us
              </Link>
            </button>
          </div>
        </div>
      </div>
        <Footer />
    </>
  );
};

export default Terms;
