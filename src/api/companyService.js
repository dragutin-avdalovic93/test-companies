import axios from "axios";
import {addCompany, deleteCompany, editCompany, getCompany} from "../features/company/companyReducer";

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

export const removeCompany = (companyId, tokenId) => async (dispatch, getState) => {
    await axios.delete(process.env.REACT_APP_PROJECT_API_URL + `/companies/${companyId}`, {
        headers: {
            Authorization: `Bearer ${tokenId}`,
        },
    });
    dispatch(deleteCompany(companyId));
};

export default {fetchCompany, createCompany, updateCompany, removeCompany};