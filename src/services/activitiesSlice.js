import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activities: [],
};

const activitySlice = createSlice({
    name: "activitySlice",
    initialState,
    reducers: {
        setAcitvities: (state, action) => {
            const payload = action?.payload || [];
            state.activities = payload;
            return state;
        }
    }
})

export const { setAcitvities } = activitySlice.actions;
export default activitySlice.reducer;