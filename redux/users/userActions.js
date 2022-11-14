import { supabase } from "../../utils/initSupabase";

export const GET_USERS = 'GET_USERS';
export const GET_SINGLE_USERS = 'GET_SINGLE_USERS';
export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const getUser = () => async dispatch => {
    try {
        let { data: user, error } = await supabase
        .from('user')
        .select('*');
        if(error) throw error;
        dispatch({ type: SET_USERS, payload: user });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleUser = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_USERS,
        payload: id
    });
}

export const setUsers = users => dispatch => {
    dispatch({
        type: SET_USERS,
        payload: users,
    });
};

export const addUser = user => async dispatch => {
    try {
        let { data, error } = await supabase
        .from('user')
        .insert([user]);
        if(error) throw error;
        dispatch({
            type: ADD_USER,
            payload: user,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

export const updateUser = user => async dispatch => {
    try {
        let { data: updatedUser, error } = await supabase
        .from('user')
        .update(user)
        .eq('id', user.id);
        if(error) throw error;
        dispatch({
            type: UPDATE_USER,
            payload: user,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = user => async dispatch => {
    try {
        let { data: deletedUser, error } = await supabase
        .from('user')
        .delete()
        .eq('id', user.id);
        if(error) throw error;
        dispatch({
            type: DELETE_USER,
            payload: user,
        });
    } catch (error) {
        console.log(error);
    }
}