import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const ImageModal = ({ isOpen, onClose, images, currentIndex, setCurrentIndex }) => {
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-2xl mx-auto bg-transparent rounded-lg flex flex-col items-center">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <div className="relative w-full flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <img
                  src={images[currentIndex]}
                  alt={`Product zoom ${currentIndex + 1}`}
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain bg-white"
                />
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden ${
                      idx === currentIndex ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
};

export default ImageModal; 