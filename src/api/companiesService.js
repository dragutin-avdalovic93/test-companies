import axios from "axios";

import {
    fetchCompaniesFailure,
    fetchCompaniesRequest,
    fetchCompaniesSuccess
} from "../features/companies/companiesReducer";

//thunk action for fetching companies
export const fetchCompanies = (search = '', pageIndex = 1, pageSize = 5) => {
    return async (dispatch, getState) => {
        dispatch(fetchCompaniesRequest());

        try {
            const tokenId = getState().user.tokenId;
            const response = await axios.get(process.env.REACT_APP_PROJECT_API_URL + '/me', {
                headers: {
                    Authorization: `Bearer ${tokenId}`,
                },
            });
            if (response.data) {
                let getUrl = process.env.REACT_APP_PROJECT_API_URL + '/companies';

                if (search !== '' || pageIndex !== 1 || pageSize !== 5) {
                    getUrl += `?Search=${search}&PageIndex=${pageIndex}&PageSize=${pageSize}`;
                }
                const companiesResponse = await axios.get(getUrl, {
                    headers: {
                        Authorization: `Bearer ${tokenId}`,
                    },
                });
                if (companiesResponse.data) {
                    dispatch(fetchCompaniesSuccess(companiesResponse.data));
                }
            }
        } catch (err) {
            dispatch(fetchCompaniesFailure(err.message));
        }
    }
};

export default fetchCompanies;