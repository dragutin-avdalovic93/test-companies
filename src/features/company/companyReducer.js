import axios from "axios";
import {useSelector} from "react-redux";

const initialState = {
    companyId: '',
    companyName: ''
};

const ADD_COMPANY = 'ADD_COMPANY';
const EDIT_COMPANY = 'EDIT_COMPANY';
const GET_COMPANY = 'GET_COMPANY';
const DELETE_COMPANY = 'DELETE_COMPANY';

export const addCompany = (company) => {
    return {
        type: ADD_COMPANY,
        payload: company
    };
};

export const editCompany = (companyId, company) => {
    return {
        type: EDIT_COMPANY,
        payload: {
            companyId,
            company
        }
    };
};

export const getCompany = (companyId) => {
    return {
        type: GET_COMPANY,
        payload: companyId
    };
};

export const deleteCompany = (companyId) => {
    return {
        type: DELETE_COMPANY,
        payload: companyId
    };
};

export const fetchCompany = (companyId) => async (dispatch, getState) => {
    const response = await axios.get(process.env.REACT_APP_PROJECT_API_URL + `/companies/${companyId}`);
    dispatch(getCompany(response.data));
};

export const createCompany = (company, tokenId) => async (dispatch, getState) => {
    const response = await axios.post(process.env.REACT_APP_PROJECT_API_URL + '/companies', company, {
        headers: {
            Authorization: `Bearer ${tokenId}`,
        },
    });
    dispatch(addCompany(response.data));
};

export const updateCompany = (companyId, company, tokenId) => async (dispatch, getState) => {
    await axios.put(process.env.REACT_APP_PROJECT_API_URL + `/companies/${companyId}`, company, {
        headers: {
            Authorization: `Bearer ${tokenId}`,
        },
    });
    dispatch(editCompany(companyId, company));
};

export const removeCompany = (companyId,tokenId) => async (dispatch, getState) => {
    await axios.delete(process.env.REACT_APP_PROJECT_API_URL + `/companies/${companyId}`, {
        headers: {
            Authorization: `Bearer ${tokenId}`,
        },
    });
    dispatch(deleteCompany(companyId));
};

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMPANY:
            return {
                ...state,
                companyId: action.payload.companyId,
                companyName: action.payload.companyName
            };
        case EDIT_COMPANY:
            if (state.companyId === action.payload.companyId) {
                return {
                    ...state,
                    companyName: action.payload.company.companyName
                };
            }
            return state;
        case GET_COMPANY:
            return {
                ...state,
                companyId: action.payload.companyId,
                companyName: action.payload.companyName
            };
        case DELETE_COMPANY:
            if (state.companyId === action.payload) {
                return initialState;
            }
            return state;
        default:
            return state;
    }
};

export default companyReducer;
