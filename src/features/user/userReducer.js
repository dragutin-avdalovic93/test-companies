import axios from "axios";

//action types
const SET_USER_LOGGED_IN = "LOGIN";
const SET_USER_LOGGED_OUT = "LOGOUT";

//action creators
export const setUserLoggedIn = (tokenId, profileObj) => ({
    type: SET_USER_LOGGED_IN,
    payload: {tokenId, profileObj}
});

export const setUserLoggedOut = () => ({
    type: SET_USER_LOGGED_OUT
});

//thunk action
export const authenticateUser = (tokenId, profileObj) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get('http://54.80.209.252/me', {
                headers: {
                    Authorization: `Bearer ${tokenId}`,
                },
            });
            if (response.data) {
                console.log('ress', response.data);
                dispatch(setUserLoggedIn(tokenId, profileObj));
            }
        } catch (e) {
            console.log(e);
            dispatch(setUserLoggedOut());
        }
    };
};


const initialState = {
    tokenId: null,
    profileObj: null,
};

//reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGGED_IN:
            return {
                tokenId: action.payload.tokenId,
                profileObj: action.payload.profileObj,
            };
        case SET_USER_LOGGED_OUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
