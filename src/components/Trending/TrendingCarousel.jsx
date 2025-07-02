import React from 'react'

const trendingProducts = [
  { name: 'Oversized T-Shirt', image: '/public/oversized_t-shirt.glb', price: '$49' },
  { name: 'Classic Hoodie', image: '/public/12.jpg', price: '$69' },
  { name: 'Premium Joggers', image: '/public/13.jpg', price: '$59' },
  { name: 'Luxury Cap', image: '/public/NEW.png', price: '$29' },
  { name: 'Signature Jacket', image: '/public/NEW (1).png', price: '$129' },
]

const TrendingCarousel = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Trending / Best Sellers</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
        {trendingProducts.map((prod, idx) => (
          <div key={idx} className="min-w-[220px] bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer group">
            <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{prod.name}</h3>
              <p className="text-gray-700 font-bold">{prod.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default TrendingCarousel 