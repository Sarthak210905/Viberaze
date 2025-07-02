import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

// Helper to get user ID
const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.user?.uid || user.uid) : null;
};

// Async Thunks
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { rejectWithValue }) => {
    const userId = getUserId();
    if (!userId) return [];
    try {
        const wishlistCol = collection(fireDB, 'users', userId, 'wishlist');
        const wishlistSnapshot = await getDocs(wishlistCol);
        return wishlistSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                ...(data.time && typeof data.time.toMillis === 'function' ? { time: data.time.toMillis() } : {})
            };
        });
    } catch (error) {
        toast.error('Could not fetch wishlist.');
        return rejectWithValue(error.message);
    }
});

export const toggleWishlistItem = createAsyncThunk('wishlist/toggleWishlistItem', async (product, { rejectWithValue, getState }) => {
    const userId = getUserId();
    if (!userId) {
        toast.error('You must be logged in to manage your wishlist.');
        return rejectWithValue('User not logged in');
    }

    const { wishlist } = getState();
    const isInWishlist = wishlist.items.some(item => item.id === product.id);
    const wishlistItemRef = doc(fireDB, 'users', userId, 'wishlist', product.id);

    try {
        if (isInWishlist) {
            await deleteDoc(wishlistItemRef);
            toast.success('Removed from wishlist');
            return { productId: product.id, removed: true };
        } else {
            await setDoc(wishlistItemRef, product);
            toast.success('Added to wishlist');
            return { product, removed: false };
        }
    } catch (error) {
        toast.error('Could not update wishlist.');
        return rejectWithValue(error.message);
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Toggle Wishlist Item
            .addCase(toggleWishlistItem.fulfilled, (state, action) => {
                const { product, productId, removed } = action.payload;
                if (removed) {
                    state.items = state.items.filter(item => item.id !== productId);
                } else {
                    state.items.push(product);
                }
            });
    },
});

export default wishlistSlice.reducer; 