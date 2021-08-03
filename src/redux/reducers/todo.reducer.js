import { createSlice } from '@reduxjs/toolkit';
import { createProductAction } from '../actions';

const initialState = {
  taskList: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTaskAction: (state, action) => {
      return {
        ...state,
        taskList: [
          action.payload,
          ...state.taskList,
        ],
      }
    },
    editTaskAction: (state, action) => {
      const { id } = action.payload;
      const newTaskList = [...state.taskList];
      const productIndex = newTaskList.findIndex((product) => product.id === id);
      newTaskList.splice(productIndex, 1, action.payload);
      return {
        ...state,
        taskList: newTaskList,
      };
    },
    deleteTaskAction: (state, action) => {
      const { id } = action.payload;
      const newTaskList = [...state.taskList];
      const productIndex = newTaskList.findIndex((product) => product.id === id);
      newTaskList.splice(productIndex, 1);
      return {
        ...state,
        taskList: newTaskList,
      };
    },
  },
  extraReducers: {
    [createProductAction]: (state, action) => {
      console.log('Mới create product xong');
    }
  }
});

export const {
  createTaskAction,
  editTaskAction,
  deleteTaskAction,
} = todoSlice.actions

export default todoSlice.reducer;
