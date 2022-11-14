import { supabase } from "../../utils/initSupabase";

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_SINGLE_CATEGORIES = 'GET_SINGLE_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';


export const getCategories = () => async dispatch => {
    try {
        let { data: category, error } = await supabase
        .from('category')
        .select('*');
        if(error) throw error;
        dispatch({ type: SET_CATEGORIES, payload: category });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleCategory = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_CATEGORIES,
        payload: id
    });
}

export const setCategories = categories => dispatch => {
    dispatch({
        type: SET_CATEGORIES,
        payload: categories,
    });
};

export const addCategory = category => async dispatch => {
    try {
        let { data, error } = await supabase
        .from('category')
        .insert([category]);
        if(error) throw error;
        dispatch({
            type: ADD_CATEGORY,
            payload: category,
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCategory = category => async dispatch => {
    try {
        let { data: updatedCategory, error } = await supabase
        .from('category')
        .update(category)
        .eq('id', category.id);
        if(error) throw error;
        dispatch({
            type: UPDATE_CATEGORY,
            payload: category,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = category => async dispatch => {
    try {
        let { data: deletedCategory, error } = await supabase
        .from('category')
        .delete()
        .eq('id', category.id);
        if(error) throw error;
        dispatch({
            type: DELETE_CATEGORY,
            payload: category,
        });
    } catch (error) {
        console.log(error);
    }
}