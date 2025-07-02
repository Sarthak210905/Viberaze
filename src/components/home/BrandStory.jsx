import React from 'react'
import { Leaf, Sparkles, Star } from 'lucide-react'

// Assuming your dark blue is #1e293b (tailwind: bg-slate-900 / text-slate-900)
// Adjust as needed for your brand
const darkBlue = 'text-slate-900';
const darkBlueBg = 'bg-slate-900';

const BrandStory = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 text-black leading-tight text-slate-900`}>The Viberaze Story</h2>
        <p className="text-lg md:text-xl text-slate-900 mb-8 font-light border-l-4 border-slate-900 pl-4 bg-white/80 py-2 rounded-r-lg shadow-sm">
          Redefining premium fashion with timeless design, sustainable materials, and a passion for quality. Every piece is crafted to inspire confidence and comfort, blending modern trends with classic elegance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-4">
          <div className="flex flex-col items-center text-center">
            <Leaf className={`w-8 h-8 mb-2 ${darkBlue}`} />
            <span className="text-lg font-semibold text-black">100% Sustainable</span>
            <span className="text-slate-900 text-xs mt-1 opacity-70">Eco-friendly fabrics</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Star className={`w-8 h-8 mb-2 ${darkBlue}`} />
            <span className="text-lg font-semibold text-black">Handcrafted Quality</span>
            <span className="text-slate-900 text-xs mt-1 opacity-70">Attention to every detail</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Sparkles className={`w-8 h-8 mb-2 ${darkBlue}`} />
            <span className="text-lg font-semibold text-black">Exclusive Designs</span>
            <span className="text-slate-900 text-xs mt-1 opacity-70">Modern, limited-edition styles</span>
          </div>
        </div>
      </div>
      {/* Right: Image */}
      <div className="flex-1 flex justify-center items-center">
        <img src="/public/Viberaze (1).png" alt="Brand Story" className="rounded-3xl shadow-lg w-full max-w-2xl h-[20rem] object-cover border-2 border-slate-900" />
      </div>
    </div>
  </section>
)

export default BrandStory 