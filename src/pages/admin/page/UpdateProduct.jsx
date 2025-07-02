import React, { useContext, useState, useEffect, useRef } from "react";
import { Upload, Tag, DollarSign, List, Layers, Palette, FileText, X, Edit, Link, Plus } from "lucide-react";
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

const UpdateProduct = () => {
  const context = useContext(myContext);
  const { products, setProducts, updateProduct } = context;

  // Local state for UI management
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(CATEGORY_OPTIONS);

  // Populate local state when products context changes
  useEffect(() => {
    if (products) {
      setImageUrls(products.imageUrls || []);
      setSizes(products.sizes || []);
      setColors(products.colors || []);
      setGender(products.gender || "");
      // Normalize category to always be an array
      if (Array.isArray(products.category)) {
        setCategory(products.category);
      } else if (typeof products.category === 'string' && products.category) {
        setCategory([products.category]);
      } else {
        setCategory([]);
      }
    }
  }, [products]);

  // --- Image URL Management ---
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim() && !imageUrls.includes(imageUrlInput.trim())) {
      const newImageUrls = [...imageUrls, imageUrlInput.trim()];
      setImageUrls(newImageUrls);
      setProducts({ ...products, imageUrls: newImageUrls });
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (idx) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== idx);
    setImageUrls(newImageUrls);
    setProducts({ ...products, imageUrls: newImageUrls });
  };

  // --- Image Upload (keeping the original functionality as backup) ---
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

  // --- Category & Gender ---
  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setCategory(selected);
    setProducts({ ...products, category: selected });
  };
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setProducts({ ...products, gender: value });
  };

  // --- Sizes ---
  const handleToggleSize = (size) => {
    const newSizes = sizes.includes(size) ? sizes.filter(s => s !== size) : [...sizes, size];
    setSizes(newSizes);
    setProducts({ ...products, sizes: newSizes });
  };
  const handleAddSize = () => {
    if (sizeInput && !sizes.includes(sizeInput)) {
      const newSizes = [...sizes, sizeInput];
      setSizes(newSizes);
      setProducts({ ...products, sizes: newSizes });
      setSizeInput("");
    }
  };
  const handleRemoveSize = (size) => {
    const newSizes = sizes.filter(s => s !== size);
    setSizes(newSizes);
    setProducts({ ...products, sizes: newSizes });
  };

  // --- Colors ---
  const handleToggleColor = (color) => {
    const newColors = colors.includes(color) ? colors.filter(c => c !== color) : [...colors, color];
    setColors(newColors);
    setProducts({ ...products, colors: newColors });
  };
  const handleAddColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      const newColors = [...colors, colorInput];
      setColors(newColors);
      setProducts({ ...products, colors: newColors });
      setColorInput("");
    }
  };
  const handleRemoveColor = (color) => {
    const newColors = colors.filter(c => c !== color);
    setColors(newColors);
    setProducts({ ...products, colors: newColors });
  };

  // --- Validation & Submit ---
  const validate = () => {
    const errs = {};
    if (!products.title) errs.title = "Title is required";
    if (!products.price) errs.price = "Price is required";
    if (!products.category || products.category.length === 0) errs.category = "Category is required";
    if (!products.description) errs.description = "Description is required";
    if (!imageUrls.length) errs.imageUrls = "At least one image is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateProduct();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-black">
        <div className="bg-white p-6 text-center border-b border-black">
          <h1 className="text-2xl font-bold text-black flex items-center justify-center gap-3">
            <Edit className="w-6 h-6" color="black" /> Update Product
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
              <br />
              <div className="relative mt-2">
                <h3 className="flex items-center gap-2 text-base font-semibold text-black mb-2"><Layers className="w-5 h-5 text-yellow-500" /> Categories <span className="text-xs text-gray-500 font-normal">(Select multiple)</span></h3>
                <div className="border border-yellow-200 shadow-sm w-full pl-6 pr-3 py-3 bg-yellow-50 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 h-56 overflow-y-auto flex flex-col gap-2 transition-all" style={{ minHeight: '140px', maxHeight: '220px' }}>
                  {categoryOptions.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-yellow-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={category.includes(cat)}
                        onChange={e => {
                          let updated;
                          if (e.target.checked) {
                            updated = [...category, cat];
                          } else {
                            updated = category.filter(c => c !== cat);
                          }
                          setCategory(updated);
                          setProducts({ ...products, category: updated });
                        }}
                        className="accent-yellow-500 w-4 h-4"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                  {/* Other option */}
                  <label className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-yellow-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={showCustomInput}
                      onChange={e => setShowCustomInput(e.target.checked)}
                      className="accent-yellow-500 w-4 h-4"
                    />
                    <span className="text-sm font-medium">Other</span>
                  </label>
                  {showCustomInput && (
                    <div className="flex gap-2 items-center mt-1 pl-6">
                      <input
                        type="text"
                        value={customCategory}
                        onChange={e => setCustomCategory(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (customCategory && !categoryOptions.includes(customCategory) && !category.includes(customCategory)) {
                              setCategoryOptions([...categoryOptions, customCategory]);
                              const updated = [...category, customCategory];
                              setCategory(updated);
                              setProducts({ ...products, category: updated });
                              setCustomCategory("");
                              setShowCustomInput(false);
                            }
                          }
                        }}
                        className="border border-yellow-400 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter custom category"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customCategory && !categoryOptions.includes(customCategory) && !category.includes(customCategory)) {
                            setCategoryOptions([...categoryOptions, customCategory]);
                            const updated = [...category, customCategory];
                            setCategory(updated);
                            setProducts({ ...products, category: updated });
                            setCustomCategory("");
                            setShowCustomInput(false);
                          }
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs transition"
                      >Add</button>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(Array.isArray(category) ? category : (category ? [category] : [])).map((cat) => (
                    <span key={cat} className="bg-yellow-500/90 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-md border border-yellow-700/30">
                      {cat}
                      <button type="button" onClick={() => {
                        const updated = category.filter(c => c !== cat);
                        setCategory(updated);
                        setProducts({ ...products, category: updated });
                      }} className="ml-1 hover:bg-yellow-700/80 rounded-full p-0.5 transition"><X size={14} color="white" /></button>
                    </span>
                  ))}
                  {category.length > 0 && (
                    <button type="button" onClick={() => {
                      setCategory([]);
                      setProducts({ ...products, category: [] });
                    }} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs ml-2 border border-gray-300 hover:bg-gray-300 transition">Clear All</button>
                  )}
                </div>
                {errors.category && <span className="text-red-500 text-xs ml-2">{errors.category}</span>}
              </div>
            </div>
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
              {/* Mark Out of Stock Option */}
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="markOutOfStock"
                  checked={Number(products.stock) === 0}
                  onChange={e => setProducts({ ...products, stock: e.target.checked ? 0 : products.stock })}
                  className="mr-2 accent-red-600"
                />
                <label htmlFor="markOutOfStock" className="text-black">Mark as Out of Stock</label>
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
              <div>
                <label className="block text-black mb-1">Sizes</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {SIZE_OPTIONS.map((size) => (
                    <button type="button" key={size} onClick={() => handleToggleSize(size)} className={`px-3 py-1 rounded-full border transition-colors duration-150 ${sizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-black border-black'} focus:outline-none`}>
                      {size}
                    </button>
                  ))}
                  {sizes.filter(s => !SIZE_OPTIONS.includes(s)).map((size) => (
                    <span key={size} className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                      {size}
                      <button type="button" onClick={() => handleRemoveSize(size)} className="ml-1"><X size={14} color="white" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-black bg-white text-black placeholder-gray-400 focus:outline-none" placeholder="Add custom size" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }} />
                  <button type="button" onClick={handleAddSize} className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg transition"><Plus size={16} color="white" /></button>
                </div>
              </div>
              <div>
                <label className="block text-black mb-1">Colors</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button type="button" key={color} onClick={() => handleToggleColor(color)} className={`px-3 py-1 rounded-full border transition-colors duration-150 ${colors.includes(color) ? 'bg-black text-white border-black' : 'bg-white text-black border-black'} focus:outline-none`}>
                      {color}
                    </button>
                  ))}
                  {colors.filter(c => !COLOR_OPTIONS.includes(c)).map((color) => (
                    <span key={color} className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                      {color}
                      <button type="button" onClick={() => handleRemoveColor(color)} className="ml-1"><X size={14} color="white" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={colorInput} onChange={(e) => setColorInput(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-black bg-white text-black placeholder-gray-400 focus:outline-none" placeholder="Add custom color" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddColor(); } }} />
                  <button type="button" onClick={handleAddColor} className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg transition"><Plus size={16} color="white" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Images - Updated Section */}
          <div>
            <h2 className="text-lg font-semibold text-black mb-4 border-b border-black pb-2">Images</h2>
            
            {/* Image URL Input */}
            <div className="mb-4">
              <label className="block text-black mb-2">Add Image URL</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="https://example.com/image.jpg"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddImageUrl(); } }}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleAddImageUrl} 
                  className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <Plus size={16} color="white" /> Add URL
                </button>
              </div>
              {errors.imageUrls && <span className="text-red-500 text-xs ml-2">{errors.imageUrls}</span>}
            </div>

            {/* File Upload (Alternative) */}
            <div className="mb-4">
              <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current.click()} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
                <Upload size={16} color="white" /> Or Upload Files
              </button>
            </div>

            {/* Image Preview */}
            <div className="flex gap-4 flex-wrap mt-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img 
                    src={url} 
                    alt={`preview ${idx}`} 
                    className="h-24 w-24 object-cover rounded-lg border-2 border-black"
                    onError={(e) => {
                      e.target.style.border = '2px solid red';
                      e.target.alt = 'Failed to load image';
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(idx)} 
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-80 group-hover:opacity-100 transition"
                  >
                    <X size={16} color="white" />
                  </button>
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
              <Edit className="inline-block mr-2" color="white" /> Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;