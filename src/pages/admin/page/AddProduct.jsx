import React, { useContext, useState } from "react";
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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Add Product</h1>
        <div>
          <input
            type="text"
            value={products.title}
            onChange={(e) => setProducts({ ...products, title: e.target.value })}
            name="title"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product title"
          />
        </div>
        <div>
          <input
            type="text"
            value={products.price}
            onChange={(e) => setProducts({ ...products, price: e.target.value })}
            name="price"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product price"
          />
        </div>
        <div>
          <textarea
            value={imageUrls.join(", ")}
            onChange={handleImageUrlsChange}
            name="imageUrls"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product image URLs (comma separated)"
          />
        </div>
        <div>
          <input
            type="text"
            value={products.category}
            onChange={(e) => setProducts({ ...products, category: e.target.value })}
            name="category"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product category"
          />
        </div>
        <div>
          <textarea
            value={colors.join(", ")}
            onChange={handleColorsChange}
            name="colors"
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product colors (comma separated)"
          />
        </div>
        <div>
          <textarea
            cols="30"
            rows="5"
            name="description"
            value={products.description}
            onChange={(e) => setProducts({ ...products, description: e.target.value })}
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product description"
          />
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={addProduct}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;