import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {makeStyles} from "@mui/styles";
import {useFormik} from "formik";
import {updateCompany} from "../api/companyService";
import Typography from "@mui/material/Typography";
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux'
import {Alert} from "@mui/material";
import store from "../app/store";
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            width: "20ch",
            marginTop: "10px"
        },
    },
    submitButton: {
        width: "20ch",
        margin: "10px"
    }
}));

const validationSchema = yup.object({
    companyName: yup.string().required("Company name is required")
})

function EditCompanyForm() {

    const [editName, setEditName] = useState('');

    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();
    let editNameText = '';

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };


    const {companyId} = useParams();
    const tokenId = useSelector((state) => state.user.tokenId);

    useEffect(() => {
        fetch(process.env.REACT_APP_PROJECT_API_URL + `/companies/${companyId}`, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + tokenId,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }).then(
            response => response.json()
        ).then(data => {
            setEditName(data.companyName);
            editNameText = data.companyName;
        });
    }, []);

    const dispatch = useDispatch();
    const classes = useStyles();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            companyName: editName,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const tokenId = store.getState().user.tokenId;
            const responseMe = await axios.get(process.env.REACT_APP_PROJECT_API_URL + '/me', {
                headers: {
                    Authorization: `Bearer ${tokenId}`,
                },
            });
            if (responseMe.data) {
                dispatch(updateCompany(companyId, values, tokenId));
                formik.resetForm();
                setAlertOpen(true);
                navigate("/");
            }
        },
    });

    return (
        <div style={{border: "solid 1px blue", borderRadius: "15px", maxWidth: "300px", margin: "40px auto"}}>
            {alertOpen && (
                <Alert severity="success" onClose={handleCloseAlert} style={{borderRadius: "15px"}}>
                    Company edited successfully!
                </Alert>
            )}
            <form onSubmit={formik.handleSubmit} className={classes.root} style={{
                display: "flex", flexDirection: 'column',
                alignItems: "center", justifyContent: "center"
            }}>
                <Typography variant="h5" component="h5" style={{marginTop: "20px"}}>
                    Edit company
                </Typography>
                <TextField
                    label="Company name"
                    variant="outlined"
                    name="companyName"
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
                    Save changes
                </Button>
            </form>
        </div>
    );
}

export default EditCompanyForm;