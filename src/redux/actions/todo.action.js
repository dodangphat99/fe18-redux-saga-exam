import { TO_DO_ACTION } from '../constants';

export const createTaskAction = (params) => {
  return {
    type: TO_DO_ACTION.CREATE_TASK,
    payload: params,
  };
}

export const editTaskAction = (params) => {
  return {
    type: TO_DO_ACTION.EDIT_TASK,
    payload: params,
  };
}

export const deleteTaskAction = (params) => {
  return {
    type: TO_DO_ACTION.DELETE_TASK,
    payload: params,
  };
}
