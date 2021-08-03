import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { PRODUCT_ACTION } from '../constants';

function* getProductListSaga(action) {
  try {
    const result = yield axios.get('http://localhost:3001/products?_sort=id&_order=desc');
    yield put({
      type: PRODUCT_ACTION.GET_PRODUCT_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({ type: PRODUCT_ACTION.GET_PRODUCT_LIST_FAIL, payload: e.message });
  }
}

function* createProductSaga(action) {
  try {
    const result = yield axios.post('http://localhost:3001/products', action.payload);
    yield put({
      type: PRODUCT_ACTION.CREATE_PRODUCT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({ type: PRODUCT_ACTION.CREATE_PRODUCT_FAIL, payload: e.message });
  }
}

function* editProductSaga(action) {
  console.log(action.payload);
  try {
    const result = yield axios.put(`http://localhost:3001/products/${action.payload.id}`,action.payload);
    yield put({ type: PRODUCT_ACTION.EDIT_PRODUCT_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: PRODUCT_ACTION.EDIT_PRODUCT_FAIL, payload: e.message });
  }
}

function* deleteProductSaga(action) {
  try {
    const result = yield axios.delete(`http://localhost:3001/products/${action.payload.id}`);
    yield put({ type: PRODUCT_ACTION.DELETE_PRODUCT_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: PRODUCT_ACTION.DELETE_PRODUCT_FAIL, payload: e.message });
  }
}

export default function* productSaga() {
  yield takeEvery(PRODUCT_ACTION.GET_PRODUCT_LIST, getProductListSaga);
  yield takeEvery(PRODUCT_ACTION.CREATE_PRODUCT, createProductSaga);
  yield takeEvery(PRODUCT_ACTION.DELETE_PRODUCT, deleteProductSaga);
  yield takeEvery(PRODUCT_ACTION.EDIT_PRODUCT, editProductSaga);
}
