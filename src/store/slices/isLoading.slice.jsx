import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (_state, action) => {
            const isLoadiang = action.payload
            return isLoadiang
        }
    }
})

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
