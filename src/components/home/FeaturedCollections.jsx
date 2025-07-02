import React from 'react'

const collections = [
  { title: 'Summer Essentials', image: '/public/12.jpg', desc: 'Light, breezy, and stylish picks for the season.' },
  { title: 'Luxury Loungewear', image: '/public/13.jpg', desc: 'Experience comfort and elegance at home.' },
  { title: 'Best Sellers', image: '/public/NEW.png', desc: 'Our most loved and top-rated pieces.' },
]

const FeaturedCollections = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((col) => (
          <div key={col.title} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-gray-50 cursor-pointer group">
            <img src={col.image} alt={col.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{col.title}</h3>
              <p className="text-gray-600 text-sm">{col.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturedCollections 