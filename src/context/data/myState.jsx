import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import PropTypes from 'prop-types';

function MyState({children}) {
    const [mode] = useState('light'); // Fixed light mode, no toggle

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        salePrice: null,
        imageUrls: [],
        category: null,
        description: null,
        stock: null,
        sizes: [],
        colors: [],
        isFeatured: false,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.category == null || products.description == null || products.stock == null) {
            return toast.error("all fields are required")
        }

        const productData = {
            ...products,
            sizes: Array.isArray(products.sizes) ? products.sizes.map(s => s.trim()) : [],
            colors: Array.isArray(products.colors) ? products.colors.map(c => c.trim()) : [],
        };

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, productData)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    const d = doc.data();
                    productArray.push({
                        ...d,
                        id: doc.id,
                        time: d.time && d.time.toMillis ? d.time.toMillis() : d.time,
                        date: d.date && d.date.toDate ? d.date.toDate().toISOString() : d.date
                    });
                });
                setProduct(productArray);
                setLoading(false)
            });
            return () => data;
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData();
    }, []);

    // update product function
    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true)
        try {
            const productData = {
                ...products,
                sizes: Array.isArray(products.sizes) ? products.sizes.map(s => s.trim()) : [],
                colors: Array.isArray(products.colors) ? products.colors.map(c => c.trim()) : [],
            };

            await setDoc(doc(fireDB, 'products', products.id), productData)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete product
    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success('Product Deleted successfully')
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [orders, setOrders] = useState([]); // Initialize as empty array

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = [];
            result.forEach((doc) => {
                const d = doc.data();
                ordersArray.push({
                    ...d,
                    id: doc.id,
                    date: d.date && d.date.toMillis ? d.date.toMillis() : d.date,
                    cartItems: Array.isArray(d.cartItems) ? d.cartItems.map(item => ({
                        ...item,
                        time: item.time && item.time.toMillis ? item.time.toMillis() : item.time
                    })) : d.cartItems
                });
                setLoading(false)
            });
            setOrders(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [user, setUser] = useState([]);

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "users"));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    const d = doc.data();
                    userArray.push({
                        ...d,
                        id: doc.id,
                        time: d.time && d.time.toMillis ? d.time.toMillis() : d.time,
                        createdAt: d.createdAt && d.createdAt.toMillis ? d.createdAt.toMillis() : d.createdAt
                    });
                });
                setUser(userArray);
                console.log("Fetched users from Firestore:", userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductData();
        getOrderData();
        getAllUserFunction();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{
            mode, loading, setLoading,
            products, setProducts, addProduct, product,
            edithandle, updateProduct, deleteProduct, orders,
            user, searchkey, setSearchkey, filterType, setFilterType,
            filterPrice, setFilterPrice, getAllUserFunction
        }}>
            {children}
        </MyContext.Provider>
    )
}

MyState.propTypes = {
    children: PropTypes.node.isRequired
}

export default MyState