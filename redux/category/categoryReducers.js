import { ADD_CATEGORY, DELETE_CATEGORY, GET_SINGLE_CATEGORIES, SET_CATEGORIES, UPDATE_CATEGORY } from "./categoryActions";

const initialState = {
  categories: [],
  selectedCategory: null,
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_CATEGORIES:
        return {...state, selectedCategory: state.categories.filter(category => category.id === action.payload)};
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
        return { ...state, categories: [...state.categories, action.payload] };
    case UPDATE_CATEGORY:
        return { ...state, categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category) };
    case DELETE_CATEGORY:
        return { ...state, categories: state.categories.filter(category => category.id !== action.payload.id) };
    default:
      return state;
  }
}

export default categoryReducer;
