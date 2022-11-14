import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';
import categoryReducer from './category/categoryReducers';
import adminProductReducer from './products/productReducers';
import adminUserReducer from './users/userReducers';
import adminOrderReducer from './orders/orderReducers';

const rootReducer = combineReducers({ 
    userReducer, 
    categoryReducer,
    adminProductReducer,
    adminUserReducer,
    adminOrderReducer
 });

export const Store = createStore(rootReducer, applyMiddleware(thunk));