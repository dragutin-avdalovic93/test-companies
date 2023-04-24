import {configureStore} from '@reduxjs/toolkit';
import userReducer from "../features/user/userReducer";
import companiesReducer from "../features/companies/companiesReducer";
import companyReducer from "../features/company/companyReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        companies: companiesReducer,
        company: companyReducer,
    },
});

export default store;
