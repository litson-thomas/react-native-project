export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';
export const SET_USER_LAST_NAME = 'SET_USER_LAST_NAME';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';

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

export const setUserEmail = userEmail => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: userEmail,
    });
};

export const setUserImage = userImage => dispatch => {
    dispatch({
        type: SET_USER_IMAGE,
        payload: userImage,
    });
};