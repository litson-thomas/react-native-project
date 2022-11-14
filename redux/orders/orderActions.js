import { supabase } from "../../utils/initSupabase";

export const GET_ORDERS = 'GET_ORDERS';
export const GET_SINGLE_ORDERS = 'GET_SINGLE_ORDERS';
export const SET_ORDERS = 'SET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const getOrder = () => async dispatch => {
    try {
        let { data: order, error } = await supabase
        .from('order_detail')
        .select(`
            *,
            product (
                *,
                category (
                    *
                )
            ),
            user (
                *
            ),
            customer_order (
                *,
                user (
                    *
                )
            )
        `);
        if(error) throw error;
        dispatch({ type: SET_ORDERS, payload: order });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleOrder = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_ORDERS,
        payload: id
    });
}

export const setOrders = orders => dispatch => {
    dispatch({
        type: SET_ORDERS,
        payload: orders,
    });
};

export const addOrder = order => async dispatch => {
    try {
        let { data, error } = await supabase
        .from('order_detail')
        .insert([order]);
        if(error) throw error;
        dispatch({
            type: ADD_ORDER,
            payload: order,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

export const updateOrder = order => async dispatch => {
    try {
        let { data: updatedOrder, error } = await supabase
        .from('order_detail')
        .update(order)
        .eq('id', order.id);
        if(error) throw error;
        dispatch({
            type: UPDATE_ORDER,
            payload: order,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteOrder = order => async dispatch => {
    try {
        let { data: deletedOrder, error } = await supabase
        .from('order_detail')
        .delete()
        .eq('id', order.id);
        if(error) throw error;
        dispatch({
            type: DELETE_ORDER,
            payload: order,
        });
    } catch (error) {
        console.log(error);
    }
}