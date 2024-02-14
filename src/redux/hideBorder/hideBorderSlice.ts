import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HideBorderState {
  value: boolean;
}

const initialState: HideBorderState = {
  value: true,
};

export const hideBorderReducer = createSlice({
  name: 'hideBorder',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = hideBorderReducer.actions;

export default hideBorderReducer.reducer;