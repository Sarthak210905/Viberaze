import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.user?.uid || user.uid) : null;
};

// Async Thunks
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
    const userId = getUserId();
    if (!userId) return rejectWithValue('User not logged in');

    try {
        const userDocRef = doc(fireDB, 'users', userId);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                ...(data.time && typeof data.time.toMillis === 'function' ? { time: data.time.toMillis() } : {})
            };
        } else {
            // If no profile, return a default structure
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.user?.email || user.email;
            return { email: userEmail, name: '' };
        }
    } catch (error) {
        toast.error('Could not fetch profile.');
        return rejectWithValue(error.message);
    }
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData, { rejectWithValue }) => {
    const userId = getUserId();
    if (!userId) return rejectWithValue('User not logged in');

    try {
        const userDocRef = doc(fireDB, 'users', userId);
        await setDoc(userDocRef, profileData, { merge: true });
        toast.success('Profile updated successfully');
        return profileData;
    } catch (error) {
        toast.error('Could not update profile.');
        return rejectWithValue(error.message);
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = { ...state.data, ...action.payload };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer; 