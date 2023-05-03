import axios from "axios";
import {setUserLoggedIn, setUserLoggedOut} from "../features/user/userReducer";

//thunk action
export const authenticateUser = (tokenId, profileObj) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(process.env.REACT_APP_PROJECT_API_URL + '/me', {
                headers: {
                    Authorization: `Bearer ${tokenId}`,
                },
            });
            if (response.data) {
                dispatch(setUserLoggedIn(tokenId, profileObj));
            }
        } catch (e) {
            console.log(e);
            dispatch(setUserLoggedOut());
        }
    };
};

export default authenticateUser;