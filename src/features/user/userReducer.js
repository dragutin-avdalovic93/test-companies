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

//initial state
const initialState = {
    tokenId: null,
    profileObj: null,
};

//reducer function
const userReducer = (state = initialState, action) => {
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

export default userReducer;
