import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counterSimple', // Ім'я слайсу (використовується як префікс для екшенів)
  initialState: { // Початковий стан
    value: 0,
  },  
  reducers: { // Об'єкт з функціями-редюсерами. Redux Toolkit дозволяє писати "мутуючу" логіку завдяки Immer.
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => { // action.payload буде містити значення, передане при виклику творця дії incrementByAmount() у компоненті
      state.value += Number(action.payload) || 0;
    },
    decrementByAmount: (state, action) => {
      state.value -= Number(action.payload) || 0;
    },
  },
});

// Експортуємо згенеровані екшени (action creators)
export const { increment, decrement, incrementByAmount, decrementByAmount  } = counterSlice.actions;

// Експортуємо селектор - функцію для отримання значення зі стану state.counterSimple - 'counterSimple' це ім'я слайсу, яке ми задали в name
export const selectCount = (state) => state.counterSimple.value;

// Експортуємо сам редюсер для використання в сховищі
export default counterSlice.reducer;