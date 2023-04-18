import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../features/companies/companiesReducer";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    leftColumn: {
        padding: "1rem",
    },
    rightColumn: {
        padding: "1rem",
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
    },
    card: {
        margin: "1rem 0",
        cursor: "grab",
    },
    target: {
        minHeight: "100px",
        border: "2px dashed #ccc",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

const CompaniesPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanies("", 0, 5));
    }, [dispatch]);

    const companiesServer = useSelector((state) => state.companies);

    const [companiesData, setCompaniesData] = useState({
        left: companiesServer.items,
        right: [],
    });

    const handleDragStart = (event, company) => {
        event.dataTransfer.setData("text/plain", company.companyId);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, target) => {
        const companyId = event.dataTransfer.getData("text");
        const sourceColumn = target === "right" ? "left" : "right";

        // find the company in the source column
        const companyIndex = companiesData[sourceColumn].findIndex(
            (company) => company.companyId === companyId
        );

        if (companyIndex !== -1) {
            // remove the company from the source column
            const company = companiesData[sourceColumn][companyIndex];
            const sourceItems = [...companiesData[sourceColumn]];
            sourceItems.splice(companyIndex, 1);

            // add the company to the target column
            const targetItems = [...companiesData[target]];
            targetItems.push(company);

            // update the local state
            setCompaniesData({
                left: sourceColumn === "left" ? sourceItems : companiesData.left,
                right: sourceColumn === "right" ? targetItems : companiesData.right,
            });
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} className={classes.leftColumn}>
                    {companiesData.left.map((company) => (
                        <Card
                            key={company.companyId}
                            className={classes.card}
                            draggable
                            onDragStart={(event) => handleDragStart(event, company)}
                        >
                            <CardContent>{company.companyName}</CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12} md={6} className={classes.rightColumn}>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={(event) => handleDrop(event, "right")}
                        className={classes.card}
                    >
                        <CardContent>
                            <h2>Target Column</h2>
                            {companiesData.right.map((company) => (
                                <Card key={company.companyId} className={classes.card}>
                                    <CardContent>{company.companyName}</CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </div>
                </Grid>
            </Grid>
        </div>
    );

}
export default CompaniesPage;
