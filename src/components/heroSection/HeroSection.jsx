import { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import myContext from '../../context/data/myContext';

function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data - banner images only
  const slides = [
    {
      id: 1,
      image: "/13.jpg"
    },
    {
      id: 2,
      image: "/banner3.png"
    },
 
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full">
      {/* Container that matches image size */}
      <div className="relative w-full overflow-hidden">
        {/* Reference image to set container height */}
        <img
          src={slides[currentSlide].image}
          alt=""
          className="w-full h-auto opacity-0 pointer-events-none"
        />
        
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-3000 ease-in-out transform ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0 scale-100' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full scale-95' 
                  : 'opacity-0 translate-x-full scale-95'
            }`}
          >
            <img
              src={slide.image}
              alt="Website Banner"
              className="w-full h-auto block transition-transform duration-3000 ease-in-out"
            />
          </div>
        ))}

        {/* Navigation Arrows with enhanced effects */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-70 transition-all duration-300 text-white hover:scale-110 hover:shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="transition-transform duration-200 hover:-translate-x-1" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-70 transition-all duration-300 text-white hover:scale-110 hover:shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="transition-transform duration-200 hover:translate-x-1" />
        </button>

        {/* Dots Navigation with enhanced effects */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide
                  ? 'bg-black scale-125 shadow-lg'
                  : 'bg-black bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar with enhanced animation */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
          <div
            className="h-full bg-white transition-all duration-1000 ease-out shadow-sm"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>

        {/* Slide counter with fade effect */}
      
      </div>
    </div>
  );
}

export default HeroSection;