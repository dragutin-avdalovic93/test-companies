import store from '../../app/store';
import {useSelector} from "react-redux";
import axios from "axios";


//constants - action types
const FETCH_COMPANIES_REQUEST = 'FETCH_COMPANIES_REQUEST';
const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

//initial state of the companies reducer
const initialState = {
    items: [],
    itemCount: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    loading: false,
    error: null
};

//action creators for fetching companies
export const fetchCompaniesRequest = () => ({
    type: FETCH_COMPANIES_REQUEST
});

export const fetchCompaniesSuccess = (data) => ({
    type: FETCH_COMPANIES_SUCCESS,
    payload: data
});

export const fetchCompaniesFailure = (error) => ({
    type: FETCH_COMPANIES_FAILURE,
    payload: error
});

//thunk action for fetching companies
export const fetchCompanies = (search = '', pageIndex = 1, pageSize = 5) => {
    return async (dispatch, getState) => {
        dispatch(fetchCompaniesRequest());

        try {
            const tokenId = getState().auth.tokenId;
            const response = await axios.get('http://54.80.209.252/me', {
                headers: {
                    Authorization: `Bearer ${tokenId}`,
                },
            });
            if (response.data) {
                let getUrl = 'http://54.80.209.252/companies';

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

//companies reducer
const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPANIES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COMPANIES_SUCCESS:
            return {
                ...state,
                items: action.payload.items,
                itemCount: action.payload.itemCount,
                pageIndex: action.payload.pageIndex,
                pageSize: action.payload.pageSize,
                pageCount: action.payload.pageCount,
                loading: false,
                error: null,
            };
        case FETCH_COMPANIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default companiesReducer;
