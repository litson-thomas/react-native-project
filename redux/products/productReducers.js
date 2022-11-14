import { ADD_PRODUCT, DELETE_PRODUCT, GET_SINGLE_PRODUCTS, SET_PRODUCTS, UPDATE_PRODUCT } from "./productActions";

const initialState = {
  products: [],
  selectedProduct: null,
};

function adminProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCTS:
        return {...state, selectedProduct: state.products.filter(x => x.id === action.payload)};
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
        return { ...state, products: [...state.products, action.payload] };
    case UPDATE_PRODUCT:
        return { ...state, products: state.products.map(x => x.id === action.payload.id ? action.payload : x) };
    case DELETE_PRODUCT:
        return { ...state, products: state.products.filter(x => x.id !== action.payload.id) };
    default:
      return state;
  }
}

export default adminProductReducer;
