'use strict';

import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';

import Main from './components/Main.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import './style.css';

const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <Main/>
        </Provider>
    </ErrorBoundary>
);