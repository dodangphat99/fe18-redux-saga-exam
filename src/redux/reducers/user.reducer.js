import { USER_ACTION } from '../constants';

const initialState = {
  userList: [
    {
      name: 'Tuan',
      email: 'lebathanhtuan@gmail.com',
      password: '123456',
      role: 'admin',
    },
    {
      name: 'Ahihi',
      email: 'ahihi@gmail.com',
      password: '123456',
      role: 'user',
    }
  ],
  userInfo: {},
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTION.LOGIN: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case USER_ACTION.LOGOUT: {
      return {
        ...state,
        userInfo: {},
      };
    }
    case USER_ACTION.REGISTER: {
      return {
        ...state,
        userList: [
          ...state.userList,
          action.payload,
        ]
      };
    }
    default:
      return state;
  }
}

export default userReducer;
