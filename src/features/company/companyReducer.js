//constants
const ADD_COMPANY = 'ADD_COMPANY';
const EDIT_COMPANY = 'EDIT_COMPANY';
const GET_COMPANY = 'GET_COMPANY';
const DELETE_COMPANY = 'DELETE_COMPANY';

//initial state
const initialState = {
    companyId: '',
    companyName: ''
};

//action creators
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

//reducer function
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
