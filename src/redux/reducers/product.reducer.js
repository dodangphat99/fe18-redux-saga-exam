import { createReducer } from '@reduxjs/toolkit';
import { PRODUCT_ACTION } from '../constants';

const initialState = {
  productList: [],
  productDetail: {},
}

const productReducer = createReducer(initialState, {
  [PRODUCT_ACTION.GET_PRODUCT_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      productList: [...action.payload],
    }
  },
  [PRODUCT_ACTION.CREATE_PRODUCT_SUCCESS]: (state, action) => {
    return {
      ...state,
      productList: [
        action.payload,
        ...state.productList,
      ],
    }
  },
  [PRODUCT_ACTION.EDIT_PRODUCT]: (state, action) => {
    const { id } = action.payload;
    const newProductList = [...state.productList];
    const productIndex = newProductList.findIndex((product) => product.id === id);
    newProductList.splice(productIndex, 1, action.payload);
    return {
      ...state,
      productList: newProductList,
    };
  },
  [PRODUCT_ACTION.DELETE_PRODUCT]: (state, action) => {
    const { id } = action.payload;
    const newProductList = [...state.productList];
    const productIndex = newProductList.findIndex((product) => product.id === id);
    newProductList.splice(productIndex, 1);
    return {
      ...state,
      productList: newProductList,
    };
  },
});

export default productReducer;
