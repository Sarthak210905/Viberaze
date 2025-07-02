import React, { useContext, useState, useRef } from "react";
import { Plus, Image, Tag, DollarSign, List, Layers, Palette, FileText, X } from "lucide-react";
import myContext from "../../../context/data/myContext";

const CATEGORY_OPTIONS = [
  // Men's Categories
  "Men T-Shirts", "Men Shirts", "Men Hoodies", "Men Jackets", "Men Pants", "Men Shorts",
  // Women's Categories  
  "Women T-Shirts", "Women Shirts", "Women Hoodies", "Women Jackets", "Women Dresses", "Women Pants", "Women Shorts",
  // Kids Categories
  "Kids T-Shirts", "Kids Shirts", "Kids Hoodies", "Kids Jackets", "Kids Dresses", "Kids Pants", "Kids Shorts",
  // Accessories Categories
  "Accessory Bags", "Accessory Watches", "Accessory Jewelry", "Accessory Belts", "Accessory Sunglasses", "Accessory Scarves", "Accessory Hats",
  // General Categories
  "Shoes", "Unisex"
];
const GENDER_OPTIONS = ["Men", "Women", "Unisex", "Kids"];
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOR_OPTIONS = [
  "Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Gray", "Brown", "Orange"
];

const AddProduct = () => {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;
  const [imageUrls, setImageUrls] = useState(products.imageUrls || []);
  const [sizes, setSizes] = useState(products.sizes || []);
  const [sizeInput, setSizeInput] = useState("");
  const [colors, setColors] = useState(products.colors || []);
  const [colorInput, setColorInput] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();
  const [gender, setGender] = useState(products.gender || "");
  const [category, setCategory] = useState(products.category || "");

  // --- Image Upload ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = [...imageUrls];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImageUrls.push(reader.result);
        setImageUrls([...newImageUrls]);
        setProducts({ ...products, imageUrls: [...newImageUrls] });
      };
      reader.readAsDataURL(file);
    });
  };
  const handleRemoveImage = (idx) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== idx);
    setImageUrls(newImageUrls);
    setProducts({ ...products, imageUrls: newImageUrls });
  };

  // --- Sizes ---
  const handleAddSize = () => {
    if (sizeInput && !sizes.includes(sizeInput)) {
      const newSizes = [...sizes, sizeInput];
      setSizes(newSizes);
      setProducts({ ...products, sizes: newSizes });
      setSizeInput("");
    }
  };
  const handleRemoveSize = (size) => {
    const newSizes = sizes.filter((s) => s !== size);
    setSizes(newSizes);
    setProducts({ ...products, sizes: newSizes });
  };

  // --- Colors ---
  const handleAddColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      const newColors = [...colors, colorInput];
      setColors(newColors);
      setProducts({ ...products, colors: newColors });
      setColorInput("");
    }
  };
  const handleRemoveColor = (color) => {
    const newColors = colors.filter((c) => c !== color);
    setColors(newColors);
    setProducts({ ...products, colors: newColors });
  };

  // --- Category & Gender ---
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setProducts({ ...products, category: e.target.value });
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setProducts({ ...products, gender: e.target.value });
  };

  // --- Sizes (toggle) ---
  const handleToggleSize = (size) => {
    let newSizes;
    if (sizes.includes(size)) {
      newSizes = sizes.filter((s) => s !== size);
    } else {
      newSizes = [...sizes, size];
    }
    setSizes(newSizes);
    setProducts({ ...products, sizes: newSizes });
  };

  // --- Colors (toggle) ---
  const handleToggleColor = (color) => {
    let newColors;
    if (colors.includes(color)) {
      newColors = colors.filter((c) => c !== color);
    } else {
      newColors = [...colors, color];
    }
    setColors(newColors);
    setProducts({ ...products, colors: newColors });
  };

  // --- Validation ---
  const validate = () => {
    const errs = {};
    if (!products.title) errs.title = "Title is required";
    if (!products.price) errs.price = "Price is required";
    if (!products.category) errs.category = "Category is required";
    if (!products.description) errs.description = "Description is required";
    if (!imageUrls.length) errs.imageUrls = "At least one image is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // --- Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addProduct();
    }
  };

  const handleAddImageUrl = () => {
    const url = products.imageUrlInput?.trim();
    if (url && !imageUrls.includes(url)) {
      const newImageUrls = [...imageUrls, url];
      setImageUrls(newImageUrls);
      setProducts({ ...products, imageUrls: newImageUrls, imageUrlInput: '' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-black">
        <div className="bg-white p-6 text-center border-b border-black">
          <h1 className="text-2xl font-bold text-black flex items-center justify-center gap-3">
            <Plus className="w-6 h-6" color="black" /> Add New Product
          </h1>
        </div>
        <div className="p-8 space-y-10">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4 border-b border-black pb-2">Basic Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="text"
                  value={products.title || ""}
                  onChange={(e) => setProducts({ ...products, title: e.target.value })}
                  name="title"
                  className={`w-full pl-10 pr-3 py-2 bg-white border ${errors.title ? 'border-red-500' : 'border-black'} rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Product title"
                />
                {errors.title && <span className="text-red-500 text-xs ml-2">{errors.title}</span>}
              </div>
              {/* Category Dropdown */}
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  name="category"
                  className={`w-full pl-10 pr-3 py-2 bg-white border ${errors.category ? 'border-red-500' : 'border-black'} rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                >
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="text-red-500 text-xs ml-2">{errors.category}</span>}
              </div>
            </div>
            {/* Gender Dropdown */}
            <div className="mt-4">
              <label className="block text-black mb-1">Gender</label>
              <select
                value={gender}
                onChange={handleGenderChange}
                name="gender"
                className="w-full pl-3 pr-3 py-2 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4 border-b border-black pb-2">Description</h2>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-black" />
              <textarea
                name="description"
                value={products.description || ""}
                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                rows="3"
                className={`w-full pl-10 pr-3 py-2 bg-white border ${errors.description ? 'border-red-500' : 'border-black'} rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                placeholder="Product description"
              />
              {errors.description && <span className="text-red-500 text-xs ml-2">{errors.description}</span>}
            </div>
          </div>

          {/* Pricing & Stock */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4 border-b border-black pb-2">Pricing & Stock</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="number"
                  value={products.price || ""}
                  onChange={(e) => setProducts({ ...products, price: e.target.value })}
                  name="price"
                  className={`w-full pl-10 pr-3 py-2 bg-white border ${errors.price ? 'border-red-500' : 'border-black'} rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Product price"
                />
                {errors.price && <span className="text-red-500 text-xs ml-2">{errors.price}</span>}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="number"
                  value={products.salePrice || ""}
                  onChange={(e) => setProducts({ ...products, salePrice: e.target.value })}
                  name="salePrice"
                  className="w-full pl-10 pr-3 py-2 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Sale price"
                />
              </div>
              <div className="relative">
                <List className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="number"
                  value={products.stock || ""}
                  onChange={(e) => setProducts({ ...products, stock: e.target.value })}
                  name="stock"
                  className="w-full pl-10 pr-3 py-2 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Stock Quantity"
                />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={products.isFeatured || false}
                onChange={(e) => setProducts({ ...products, isFeatured: e.target.checked })}
                id="isFeatured"
                className="mr-2 accent-black"
              />
              <label htmlFor="isFeatured" className="text-black">Featured</label>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4 border-b border-black pb-2">Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sizes */}
              <div>
                <label className="block text-black mb-1">Sizes</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleToggleSize(size)}
                      className={`px-3 py-1 rounded-full border transition-colors duration-150 ${sizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-black border-black'} focus:outline-none`}
                    >
                      {size}
                    </button>
                  ))}
                  {/* Custom size chips */}
                  {sizes.filter(s => !SIZE_OPTIONS.includes(s)).map((size) => (
                    <span key={size} className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                      {size}
                      <button type="button" onClick={() => handleRemoveSize(size)} className="ml-1"><X size={14} color="white" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-black bg-white text-black placeholder-gray-400 focus:outline-none"
                    placeholder="Add custom size"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }}
                  />
                  <button type="button" onClick={handleAddSize} className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg transition"><Plus size={16} color="white" /></button>
                </div>
              </div>
              {/* Colors */}
              <div>
                <label className="block text-black mb-1">Colors</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => handleToggleColor(color)}
                      className={`px-3 py-1 rounded-full border transition-colors duration-150 ${colors.includes(color) ? 'bg-black text-white border-black' : 'bg-white text-black border-black'} focus:outline-none`}
                    >
                      {color}
                    </button>
                  ))}
                  {/* Custom color chips */}
                  {colors.filter(c => !COLOR_OPTIONS.includes(c)).map((color) => (
                    <span key={color} className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                      {color}
                      <button type="button" onClick={() => handleRemoveColor(color)} className="ml-1"><X size={14} color="white" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-black bg-white text-black placeholder-gray-400 focus:outline-none"
                    placeholder="Add custom color"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddColor(); } }}
                  />
                  <button type="button" onClick={handleAddColor} className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg transition"><Plus size={16} color="white" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4 border-b border-black pb-2">Images</h2>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="Paste image URL and press Add"
                className="w-full px-3 py-2 rounded-lg border border-black bg-white text-black placeholder-gray-400 focus:outline-none"
                value={products.imageUrlInput || ''}
                onChange={e => setProducts({ ...products, imageUrlInput: e.target.value })}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddImageUrl(); } }}
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg transition"
              >
                <Plus size={16} color="white" /> Add
              </button>
              {errors.imageUrls && <span className="text-red-500 text-xs ml-2">{errors.imageUrls}</span>}
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img src={url} alt={`preview ${idx}`} className="h-24 w-24 object-cover rounded-lg border-2 border-black" />
                  <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-1 right-1 bg-black text-white rounded-full p-1 opacity-80 group-hover:opacity-100"><X size={16} color="white" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <Plus className="inline-block mr-2" color="white" /> Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;