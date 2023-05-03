import React, {useState} from "react";
import {useDispatch} from "react-redux";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {makeStyles} from "@mui/styles";
import {useFormik} from "formik";
import {createCompany} from "../api/companyService";
import Typography from "@mui/material/Typography";
import store from "../app/store";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiTextField-root": {
            width: "200px",
            marginTop: "10px"
        },
    },
    submitButton: {
        width: "150px",
        margin: "10px"
    }
}));

const validationSchema = yup.object({
    companyName: yup.string().required("Company name is required")
})

const AddCompanyForm = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            companyName: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const tokenId = store.getState().user.tokenId;
                const responseMe = await axios.get(process.env.REACT_APP_PROJECT_API_URL + '/me', {
                    headers: {
                        Authorization: `Bearer ${tokenId}`,
                    },
                });
                if (responseMe.data) {
                    dispatch(createCompany(values, tokenId));
                    formik.resetForm();
                    setAlertOpen(true);
                    navigate("/");
                }
            } catch (e) {
                console.error(e);
            }
        },
    });

    return (
        <div style={{border: "solid 1px blue", borderRadius: "15px", maxWidth: "300px", margin: "40px auto"}}>
            {alertOpen && (
                <Alert severity="success" onClose={handleCloseAlert} style={{borderRadius: "15px"}}>
                    Company created successfully!
                </Alert>
            )}
            <form onSubmit={formik.handleSubmit} className={classes.root} style={{
                display: "flex", flexDirection: 'column',
                alignItems: "center", justifyContent: "center", textAlign: "center"
            }}>
                <Typography variant="h5" component="h5" style={{marginTop: "20px"}}>
                    Add new company
                </Typography>
                <TextField
                    label="Company name"
                    variant="outlined"
                    name="companyName"
                    size="small"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.companyName && Boolean(formik.errors.companyName)
                    }
                    helperText={formik.touched.companyName && formik.errors.companyName}
                />
                <Button
                    style={{marginTop: '10px'}}
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    type="submit">
                    Add Company
                </Button>
            </form>
        </div>
    );
}

export default AddCompanyForm;