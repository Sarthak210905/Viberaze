import React from 'react'

const categories = [
  { name: 'Men', image: '/mens.png' },
  { name: 'Women', image: '/women.png' },
  { name: 'Accessories', image: './Untitled design (14).png' },
]

const ShopByCategory = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 ">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {categories.map((cat) => (
          <div key={cat.name} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white cursor-pointer group ">
            <img src={cat.image} alt={cat.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4 text-center ">
              <h3 className="text-xl font-semibold text-gray-900" >{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ShopByCategory 