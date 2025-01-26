// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer"; 
import rootSaga from "./rootSaga";      

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine all middlewares
const middlewares = [sagaMiddleware];

// Set up Redux store
const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(middlewares),  
  devTools: process.env.NODE_ENV !== 'production', 
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export store and dispatch for easier access
const { dispatch } = store;

export { store, dispatch };
