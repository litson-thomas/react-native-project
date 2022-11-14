import { supabase } from "../../utils/initSupabase";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_SINGLE_PRODUCTS = 'GET_SINGLE_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const getProduct = () => async dispatch => {
    try {
        let { data: product, error } = await supabase
        .from('product')
        .select(`
            *,
            category (
                *
            )
        `);
        if(error) throw error;
        dispatch({ type: SET_PRODUCTS, payload: product });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleProduct = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_PRODUCTS,
        payload: id
    });
}

export const setProducts = products => dispatch => {
    dispatch({
        type: SET_PRODUCTS,
        payload: products,
    });
};

export const addProduct = product => async dispatch => {
    try {
        let { data, error } = await supabase
        .from('product')
        .insert([product]);
        if(error) throw error;
        dispatch({
            type: ADD_PRODUCT,
            payload: product,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

export const updateProduct = product => async dispatch => {
    try {
        let { data: updatedProduct, error } = await supabase
        .from('product')
        .update(product)
        .eq('id', product.id);
        if(error) throw error;
        dispatch({
            type: UPDATE_PRODUCT,
            payload: product,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = product => async dispatch => {
    try {
        let { data: deletedProduct, error } = await supabase
        .from('product')
        .delete()
        .eq('id', product.id);
        if(error) throw error;
        dispatch({
            type: DELETE_PRODUCT,
            payload: product,
        });
    } catch (error) {
        console.log(error);
    }
}