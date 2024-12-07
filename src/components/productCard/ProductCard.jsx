import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product ,searchkey, setSearchkey,filterType,setFilterType,
        filterPrice,setFilterPrice} = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state)=> state.cart);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const addCart = (product)=> {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        dispatch(addToCart({ ...product, size: selectedSize, price:product.price , quantity: 1 , color: selectedColor }));
        toast.success('add to cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>New Arrivals</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {product.filter((obj)=> obj.title.toLowerCase().includes(searchkey))
                     .filter((obj) => obj.category.toLowerCase().includes(filterType))
                     .filter((obj) => obj.price.includes(filterPrice)).map((item, index) => {
                        const { title, price, description, imageUrls, id, size, colors } = item;
                        return (
                            <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                                <div className="h-full border-2 hover:shadow-gray-90 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(40,44,52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                    <div onClick={()=> window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer">
                                        {imageUrls && imageUrls.map((url, index) => (
                                            <img key={index} className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={url} alt={`product-image-${index}`} />
                                        ))}
                                    </div>
                                    
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>Viberaze</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                        <h6 className="title-font text-sm font-medium text-gray-90 mb-4" style={{ color: mode === 'dark' ? 'white' : '', }}>color</h6>
                                        <div className="mt-6">
                                            <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                            <div className="flex gap-2 mt-2">
                                                {colors && colors.length > 0 && colors.map((color, i) => (
                                                    <button
                                                        key={i}
                                                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-indigo-500' : 'border-transparent'}`}
                                                        style={{ backgroundColor: color.toLowerCase() }}
                                                        onClick={() => setSelectedColor(color)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="size" className="block text-sm font-medium text-gray-700" style={{ color: mode === 'dark' ? 'white' : '', }}>Size</label>
                                            <select
                                                id="size"
                                                name="size"
                                                value={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}
                                            >
                                                <option value="">Select size</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                {size && size.split(',').map((s, i) => (
                                                    <option key={i} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-center">
                                            <button type="button" 
                                            onClick={()=> addCart(item)}
                                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProductCard