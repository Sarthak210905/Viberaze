import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs, writeBatch, deleteDoc, query, where } from 'firebase/firestore';

// Helper to get user ID
const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.user?.uid || user.uid) : null;
};

// Async Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const userId = getUserId();
    if (!userId) return [];
    const cartRef = doc(fireDB, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    return cartSnap.exists() ? cartSnap.data().items.map(item => ({
        ...item,
        ...(item.time && typeof item.time.toMillis === 'function' ? { time: item.time.toMillis() } : {})
    })) : [];
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, { getState }) => {
    const userId = getUserId();
    if (!userId) {
        toast.error('You must be logged in to add items to the cart.');
        return;
    }

    const { cart } = getState();
    const existingItem = cart.items.find(
        (cartItem) => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.selectedColor === item.selectedColor
    );

    let newItems;
    if (existingItem) {
        newItems = cart.items.map((cartItem) =>
            cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.selectedColor === item.selectedColor
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    } else {
        newItems = [...cart.items, { ...item, quantity: 1 }];
    }

    const cartRef = doc(fireDB, 'carts', userId);
    await setDoc(cartRef, { items: newItems });
    toast.success('Item added to cart');
    return newItems;
});

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (item, { getState }) => {
    const userId = getUserId();
    if (!userId) return;

    const { cart } = getState();
    const newItems = cart.items.filter(
        (cartItem) => !(cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.selectedColor === item.selectedColor)
    );

    const cartRef = doc(fireDB, 'carts', userId);
    await setDoc(cartRef, { items: newItems });
    toast.success('Item removed from cart');
    return newItems;
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ item, quantity }, { getState }) => {
    const userId = getUserId();
    if (!userId) return;

    const { cart } = getState();
    const newItems = cart.items.map((cartItem) =>
        cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.selectedColor === item.selectedColor
            ? { ...cartItem, quantity }
            : cartItem
    );

    const cartRef = doc(fireDB, 'carts', userId);
    await setDoc(cartRef, { items: newItems });
    return newItems;
});

export const applyCoupon = createAsyncThunk('cart/applyCoupon', async ({ couponCode, cartItems }, { getState }) => {
    const couponsCol = collection(fireDB, 'coupons');
    const q = query(couponsCol, where("code", "==", couponCode));
    const couponSnapshot = await getDocs(q);

    if (couponSnapshot.empty) {
        toast.error("Invalid coupon code");
        return { discount: 0, finalTotal: cartTotal };
    }

    const coupon = { id: couponSnapshot.docs[0].id, ...couponSnapshot.docs[0].data() };
    const currentDate = new Date().toISOString().split('T')[0];
    const user = getUserId();
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);

    // Check minimum order value
    if (coupon.minimumOrderValue && cartTotal < parseFloat(coupon.minimumOrderValue)) {
        toast.error(`Minimum order value of ₹${coupon.minimumOrderValue} required for this coupon`);
        return { discount: 0, finalTotal: cartTotal };
    }

    if (coupon.endDate && coupon.endDate < currentDate) {
        toast.error("Coupon has expired");
        return { discount: 0, finalTotal: cartTotal };
    }
    
    // Usage restriction check
    if(coupon.restriction === 'once-per-user' || coupon.restriction === 'first-time-user') {
        const ordersCol = collection(fireDB, 'order');
        const userOrdersQuery = query(ordersCol, where("userid", "==", user));
        const userOrdersSnapshot = await getDocs(userOrdersQuery);
        
        if(coupon.restriction === 'first-time-user' && !userOrdersSnapshot.empty) {
            toast.error("This coupon is for first-time users only.");
            return { discount: 0, finalTotal: cartTotal };
        }

        const couponUsed = userOrdersSnapshot.docs.some(doc => doc.data().coupon === couponCode);
        if(coupon.restriction === 'once-per-user' && couponUsed) {
            toast.error("You have already used this coupon.");
            return { discount: 0, finalTotal: cartTotal };
        }
    }


    let discount = 0;
    let freeShipping = false;
    if (coupon.type === 'percentage') {
        discount = (cartTotal * coupon.discount) / 100;
    } else if (coupon.type === 'fixed') {
        discount = coupon.discount;
    } else if (coupon.type === 'free-shipping') {
        toast.success("Free shipping applied!");
        freeShipping = true;
    } else if (coupon.type === 'bogo') {
        // Find the cheapest item in the cart and set its price as the discount
        if(cartItems.length >= 2) {
            const cheapestItem = cartItems.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))[0];
            discount = cheapestItem.salePrice || cheapestItem.price;
            toast.success("BOGO offer applied!");
        } else {
            toast.info("Add at least two items to the cart for BOGO offer.");
        }
    }
    
    const finalTotal = cartTotal - discount;
    toast.success("Coupon applied successfully!");
    return { discount, finalTotal, freeShipping };
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        discount: 0,
        total: 0,
        freeShipping: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Add to Cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            // Delete from Cart
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            // Update Quantity
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.discount = action.payload.discount;
                state.total = action.payload.finalTotal;
                state.freeShipping = action.payload.freeShipping;
            });
    },
});

export default cartSlice.reducer;
