import React from "react";
import {useDispatch} from "react-redux";
import {GoogleLogin} from "react-google-login";
import authenticateUser from "../api/userService";
import Typography from "@mui/material/Typography";

export function GoogleLoginComponent() {
    const dispatch = useDispatch();

    const handleLoginSuccess = (response) => {
        try {
            const {tokenId, profileObj} = response;
            dispatch(authenticateUser(tokenId, profileObj));

        } catch (err) {
            console.log(err);
        }
    }

    const handleLoginFailure = (response) => {
        console.log(response);
    }


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <Typography variant="h6" component="h6" style={{marginTop: "20px", marginBottom: "20px"}}>
                Ovo je aplikacija za menadzment kompanija, molim vas ulogujte se preko googla
            </Typography>
            <GoogleLogin
                clientId="1006239651948-ci6i2d2jv8oh3uhkh0cq5p5j5aol4ms4.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={"single_host_origin"}
                style={{marginTop: "20px"}}
            />
        </div>
    );
}