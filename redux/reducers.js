import {
  SET_USER_ID,
  SET_USER_FIRST_NAME,
  SET_USER_LAST_NAME,
  SET_USER_ROLE,
} from "./actions";

const initialState = {
  userFirstName: "",
  userLastName: "",
  userId: "",
  useRole: "",
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
    default:
      return state;
  }
}

export default userReducer;
