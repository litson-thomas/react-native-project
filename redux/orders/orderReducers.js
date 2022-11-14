import { ADD_ORDER, DELETE_ORDER, GET_SINGLE_ORDERS, SET_ORDERS, UPDATE_ORDER } from "./orderActions";

const initialState = {
  orders: [],
  selectedOrder: {},
};

function adminOrderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDERS:
        return {...state, selectedOrder: state.orders.filter(x => x.id === action.payload)[0]};
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case ADD_ORDER:
        return { ...state, orders: [...state.orders, action.payload] };
    case UPDATE_ORDER:
        return { ...state, orders: state.orders.map(x => x.id === action.payload.id ? action.payload : x) };
    case DELETE_ORDER:
        return { ...state, orders: state.orders.filter(x => x.id !== action.payload.id) };
    default:
      return state;
  }
}

export default adminOrderReducer;
