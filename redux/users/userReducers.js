import { ADD_USER, DELETE_USER, GET_SINGLE_USERS, SET_USERS, UPDATE_USER } from "./userActions";

const initialState = {
  users: [],
  selectedUser: {},
};

function adminUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_USERS:
        return {...state, selectedUser: state.users.filter(x => x.id === action.payload)[0]};
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
        return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
        return { ...state, users: state.users.map(x => x.id === action.payload.id ? action.payload : x) };
    case DELETE_USER:
        return { ...state, users: state.users.filter(x => x.id !== action.payload.id) };
    default:
      return state;
  }
}

export default adminUserReducer;
