function StylesInSpotlight() {
  const styles = [
    { image: './Desi (1).png', title: 'Desi Elegance' },
    { image: './classic-comfort.png', title: 'Classic Comfort' },
    { image: './urban-edge.png', title: 'Urban Edge' },
    { image: '/public/NEW (1).png', title: 'Minimalist Chic' },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">STYLES IN SPOTLIGHT</h2>
        <p className="text-center text-gray-700 mb-8">Discover our handpicked styles that are trending this season.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {styles.map((style, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white cursor-pointer group border-2 border-slate-900">
              <img src={style.image} alt={style.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{style.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StylesInSpotlight; 