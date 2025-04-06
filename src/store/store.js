import { configureStore } from '@reduxjs/toolkit';
import counterSimple from '../slices/counter/counterSlice.js';
import counterEmojis from '../slices/counter/counterEmojisSlice.js';
import { loadState } from './utils/localStorage.js';
import localStorageMiddleware from './middleware/localStorageMiddleware.js';

const preloadedState = loadState(); // завантажуємо початковий стан перед створенням store, щоб бралося значення з Local Storage

export const store = configureStore({
  reducer: {
    counterSimple, // назва ключа у об'єкті reducer повинна = назві слайсу у name
    counterEmojis
  },
  preloadedState, // configureStore знає, що якщо передали preloadedState (зарезервоване слово), то його потрібно використовувати для ініціалізації відповідних частин стану, віддаючи йому перевагу над initialState з createSlice
  middleware: (getDefaultMiddleware) => // getDefaultMiddleware викликається всередині колбека і повертає [...] який містить стандартні middleware, які Redux Toolkit включає за замовчуванням (напр: redux-thunk для async)
    getDefaultMiddleware().concat(localStorageMiddleware), // додаємо до кінця цього стандартного масиву кастомний localStorageMiddleware
});

export default store;