import {
  SET_USER_ID,
  SET_USER_FIRST_NAME,
  SET_USER_LAST_NAME,
  SET_USER_ROLE,
  SET_USER_EMAIL,
  SET_USER_IMAGE,
  SET_USER_FAVOURITES,
  SET_USER_CART,
  PUSH_TO_USER_CART,
  SET_ITEM_QTY,
} from "./actions";

const initialState = {
  userFirstName: "",
  userLastName: "",
  userId: "",
  useRole: "",
  userEmail: "",
  userImage: "",
  userFavourites: [],
  userCart: [],
  itemQty: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_FIRST_NAME:
      return { ...state, userFirstName: action.payload };
    case SET_USER_LAST_NAME:
      return { ...state, userLastName: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    case SET_USER_ROLE:
      return { ...state, userRole: action.payload };
    case SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };
    case SET_USER_IMAGE:
      return { ...state, userImage: action.payload };
    case SET_USER_FAVOURITES:
      return { ...state, userFavourites: action.payload };
    case SET_USER_CART:
      return { ...state, userCart: action.payload };
    case PUSH_TO_USER_CART:
      return { ...state, userCart: state.userCart.concat(action.payload) };
    case SET_ITEM_QTY:
      return { ...state, itemQty: action.payload };
    default:
      return state;
  }
}

export default userReducer;
