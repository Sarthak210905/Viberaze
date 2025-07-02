import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const AboutUs = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Initial animation batch
      gsap.from(".fade-in", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Scroll-triggered animations batch
      gsap.utils.toArray('.scroll-animate').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-gray-50">
      <Navbar /> 
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 py-24 max-w-6xl text-center">
          <h1 className="fade-in text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            VIBERAZE
          </h1>
          <p className="fade-in text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Redefining premium streetwear through innovative design and sustainable craftsmanship.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="scroll-animate text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We are committed to creating exceptional streetwear that embodies both style and sustainability. 
            Every piece we design reflects our dedication to quality, innovation, and environmental responsibility.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our Values
            </h2>
            <p className="scroll-animate text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="scroll-animate bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                We use only premium materials and meticulous craftsmanship to ensure every piece meets our exacting standards.
              </p>
            </div>
            
            <div className="scroll-animate bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Sustainable Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Environmental responsibility is at the core of our design process, from material selection to production methods.
              </p>
            </div>
            
            <div className="scroll-animate bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Bold Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We push creative boundaries while maintaining timeless appeal, creating pieces that stand out and last.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2024, Viberaze emerged from a vision to transform the streetwear landscape. 
                We recognized the need for a brand that could deliver premium quality while maintaining 
                environmental consciousness and social responsibility.
              </p>
              <p>
                Our journey began with a simple belief: that fashion should be both expressive and 
                responsible. Today, we continue to challenge industry norms, creating pieces that 
                reflect our commitment to excellence and sustainability.
              </p>
              <p>
                Every design tells a story of innovation, every stitch represents our dedication to 
                craftsmanship, and every collection moves us closer to a more sustainable future.
              </p>
            </div>
          </div>
          
          <div className="scroll-animate">
            <div className="bg-gray-900 p-8 rounded-lg text-white">
              <h3 className="text-2xl font-semibold mb-6">Our Commitment</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Premium materials sourced responsibly</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Ethical manufacturing processes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Timeless designs that transcend trends</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Community-focused brand values</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Values */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Built by Creators, for Creators
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Our team consists of passionate individuals who understand the intersection of street culture, 
              fashion, and sustainability. We're not just creating clothes – we're building a movement.
            </p>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Connect With Us
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community and stay updated on our latest collections and sustainability initiatives.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.instagram.com/viberaze.in" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://www.twitter.com/viberaze.in" 
                target="_blank" 
                rel="noreferrer"
                className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;