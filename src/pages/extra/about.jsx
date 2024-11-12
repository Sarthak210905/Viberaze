import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutUs = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Batch animations for better performance
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
    <div ref={mainRef} className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-sky-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        <div className="container mx-auto px-4 py-20 max-w-6xl text-center">
          <h1 className="fade-in text-6xl md:text-7xl font-bold mb-6 text-white">
            VIBERAZE
          </h1>
          <p className="fade-in text-xl text-white/90 max-w-2xl mx-auto">
            Premium streetwear for the bold and conscious.
          </p>
        </div>
      </div>

      {/* Vision Cards */}
      <div className="container mx-auto px-10  mt-auto  max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="scroll-animate bg-gradient-to-br from-fuchsia-500 to-pink-500 p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-white/90 leading-relaxed">
              Redefining streetwear through bold designs and sustainable practices. 
              We create pieces that make you stand out while making a positive impact.
            </p>
          </div>
          <div className="scroll-animate bg-gradient-to-br from-cyan-500 to-blue-500 p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold mb-4">Our Promise</h2>
            <p className="text-white/90 leading-relaxed">
              Quality that speaks volumes. Each piece is crafted with premium materials 
              and attention to detail that sets new standards in streetwear.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Bold Design',
              color: 'from-yellow-400 to-orange-500',
              text: 'Pushing boundaries with vibrant, contemporary aesthetics.'
            },
            {
              title: 'Eco-Conscious',
              color: 'from-green-400 to-emerald-500',
              text: 'Sustainable materials and ethical production practices.'
            },
            {
              title: 'Premium Quality',
              color: 'from-purple-400 to-indigo-500',
              text: 'Uncompromising attention to detail in every stitch.'
            }
          ].map((value, index) => (
            <div 
              key={index}
              className={`scroll-animate bg-gradient-to-br ${value.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-white/90">{value.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="scroll-animate bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Born in 2024, Viberaze is more than just a clothing brand – it's a movement. 
              We're here to prove that style can coexist with sustainability, and premium 
              quality doesn't have to compromise our planet's future.
            </p>
            <p>
              Our collection represents the perfect blend of street culture, sustainable 
              innovation, and premium craftsmanship. Each piece tells a story of bold 
              creativity and conscious choices.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="scroll-animate text-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-8 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-6">Join Our Movement</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Be part of a community that celebrates bold style and conscious living.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              
              <a href="https://www.instagram.com/viberaze.in" target="_blank" rel="noreferrer">Instagram</a>
            </button>
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
              
              <a href="https://www.twitter.com/viberaze.in" target="_blank" rel="noreferrer">Twitter</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;