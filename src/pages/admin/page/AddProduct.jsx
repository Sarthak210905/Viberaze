import React, { useContext, useState } from "react";
import { Plus, Image, Tag, DollarSign, List, Layers, Palette, FileText } from "lucide-react";
import myContext from "../../../context/data/myContext";

const AddProduct = () => {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;
  const [imageUrls, setImageUrls] = useState([]);
  const [colors, setColors] = useState([]);

  const handleImageUrlsChange = (e) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setImageUrls(urls);
    setProducts({ ...products, imageUrls: urls });
  };

  const handleColorsChange = (e) => {
    const colorList = e.target.value.split(",").map((color) => color.trim());
    setColors(colorList);
    setProducts({ ...products, colors: colorList });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
            <Plus className="w-6 h-6" /> Add New Product
          </h1>
        </div>
        
        <div className="p-6 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Input */}
          <div className="relative col-span-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={products.title}
              onChange={(e) => setProducts({ ...products, title: e.target.value })}
              name="title"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product title"
            />
          </div>

          {/* Price Input */}
          <div className="relative col-span-1">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={products.price}
              onChange={(e) => setProducts({ ...products, price: e.target.value })}
              name="price"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product price"
            />
          </div>

          {/* Image URLs */}
          <div className="relative col-span-1">
            <Image className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={imageUrls.join(", ")}
              onChange={handleImageUrlsChange}
              name="imageUrls"
              rows="2"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product image URLs (comma separated)"
            />
          </div>

          {/* Category Input */}
          <div className="relative col-span-1">
            <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={products.category}
              onChange={(e) => setProducts({ ...products, category: e.target.value })}
              name="category"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product category"
            />
          </div>

          {/* Colors Input */}
          <div className="relative col-span-1">
            <Palette className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={colors.join(", ")}
              onChange={handleColorsChange}
              name="colors"
              rows="2"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product colors (comma separated)"
            />
          </div>

          {/* Description Input */}
          <div className="relative col-span-1">
            <FileText className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="description"
              value={products.description}
              onChange={(e) => setProducts({ ...products, description: e.target.value })}
              rows="4"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product description"
            />
          </div>

          {/* Sale Price Input */}
          <div className="relative col-span-1">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={products.salePrice}
              onChange={(e) => setProducts({ ...products, salePrice: e.target.value })}
              name="salePrice"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sale Price"
            />
          </div>

          {/* Stock Input */}
          <div className="relative col-span-1">
            <List className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={products.stock}
              onChange={(e) => setProducts({ ...products, stock: e.target.value })}
              name="stock"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stock Quantity"
            />
          </div>

          {/* Add Product Button */}
          <div className="col-span-2">
            <button
              onClick={addProduct}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="inline-block mr-2" /> Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;