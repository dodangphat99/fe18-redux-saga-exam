
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import productReducer from './product.reducer';
import userReducer from './user.reducer';
import todoReducer from './todo.reducer';
import commonReducer from './common.reducer';

import rootSaga from '../sagas';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
    todoReducer: todoReducer,
    commonReducer: commonReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false, }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
