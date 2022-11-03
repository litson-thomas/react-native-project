export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';
export const SET_USER_LAST_NAME = 'SET_USER_LAST_NAME';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_ROLE = 'SET_USER_ROLE';

export const setUserFirstName = userFirstName => dispatch => {
    dispatch({
        type: SET_USER_FIRST_NAME,
        payload: userFirstName,
    });
};

export const setUserLastName = userLastName => dispatch => {
    dispatch({
        type: SET_USER_LAST_NAME,
        payload: userLastName,
    });
};

export const setUserId = userId => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: userId,
    });
};

export const setUserRole = userRole => dispatch => {
    dispatch({
        type: SET_USER_ROLE,
        payload: userRole,
    });
};