import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../features/user/userReducer";
import companiesReducer from "../features/companies/companiesReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        companies: companiesReducer
    },
});

export default store;
