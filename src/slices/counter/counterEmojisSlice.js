import { createSlice } from '@reduxjs/toolkit';

export const counterEmojisSlice = createSlice({
  name: 'counterEmojis', 
  initialState: { 
    counts: [0, 0, 0, 0, 0],
    flyingEmojis: [],
    showResults: false
  },  
  reducers: {
    incrementEmojis: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.counts.length) {
        state.counts[index] += 1;
      }
    },
    showEmojisResults: (state, action) => {
      state.showResults = action.payload;
    },
    addFlyingEmojis: (state, action) => {
      state.flyingEmojis.push(action.payload);
    },
    removeFlyingEmoji: (state, action) => {
      const idToRemove  = action.payload;
      state.flyingEmojis = state.flyingEmojis.filter(item => item.id !== idToRemove);
    },
    resetCountEmojis: (state) => {
      state.counts = [0, 0, 0, 0, 0];
    }
  },
});

export const { incrementEmojis, resetCountEmojis, showEmojisResults, addFlyingEmojis, removeFlyingEmoji } = counterEmojisSlice.actions;

export const selectEmojisCount = (state) => state.counterEmojis.counts;
export const selectFlyingEmojis = (state) => state.counterEmojis.flyingEmojis;
export const selectShowResults = (state) => state.counterEmojis.showResults;

export default counterEmojisSlice.reducer;