function IconicSupimaTees() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <img src="/public/13.jpg" alt="Iconic Supima Tee" className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover h-64" />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">ICONIC SUPIMA TEES ARE BACK</h2>
          <p className="text-gray-700 mb-4 text-lg">Experience the luxury and comfort of our best-selling Supima tees, now restocked in all sizes and colors. Don't miss out on this iconic collection!</p>
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold">Shop Now</button>
        </div>
      </div>
    </section>
  );
}

export default IconicSupimaTees; 