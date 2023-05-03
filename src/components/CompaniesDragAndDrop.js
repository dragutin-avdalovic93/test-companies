import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import fetchCompanies from "../api/companiesService";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import store from "../app/store";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: "50px",
    },
    leftColumn: {
        padding: "1rem",
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch", // set to stretch to make all cards the same width
        borderRadius: "4px",

    },
    rightColumn: {
        padding: "1rem",
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch", // set to stretch to make all cards the same width
        borderRadius: "4px",
    },
    card: {
        margin: "1rem 0.5rem",
        cursor: "grab",
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        transition: "all 0.3s ease-in-out",
        opacity: 1,
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        },
    },
    cardHolder: {
        padding: "1rem",
        backgroundColor: "#5cb4e2",
        borderRadius: "4px",
        opacity: 1,
    },
    cardDragging: {
        opacity: 1,
    }
});

const CompaniesPage = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [companiesServer, setCompaniesServer] = useState([]);
    const [companiesData, setCompaniesData] = useState({
        left: [],
        right: [],
    });

    const companies = useSelector((state) => state.companies);


    useEffect(() => {
        dispatch(fetchCompanies("", "", "")).then(() => {
            setCompaniesServer(store.getState().companies);
            console.log('test', companies);
            console.log('test 2', companiesServer);
            setCompaniesData({
                left: companies.items,
                right: [],
            });
        });
    }, [dispatch, companies, companiesServer]);

    const handleDragStart = (event, company) => {
        event.dataTransfer.setData("text/plain", company.companyId);
        event.currentTarget.classList.add("cardDragging");
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, target) => {
        const companyId = event.dataTransfer.getData("text");
        const sourceColumn = target === "right" ? "left" : "right";
        const targetColumn = target === "right" ? "right" : "left";

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
                left: targetColumn === "left" ? targetItems : sourceItems,
                right: targetColumn === "right" ? targetItems : sourceItems,
            });


        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} className={classes.leftColumn}>
                    <div onDragOver={handleDragOver}
                         onDrop={(event) => handleDrop(event, "left")}
                         className={classes.cardHolder}
                         style={{width: "100%", height: "100%"}}>
                        {companiesData.left.map((company) => (
                            <Card
                                key={company.companyId}
                                className={classes.card}
                                draggable
                                onDragStart={(event) => handleDragStart(event, company)}
                            >
                                <CardContent onDrop={() => {
                                    return false;
                                }}>
                                    {company.companyName}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.rightColumn}>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={(event) => handleDrop(event, "right")}
                        className={classes.cardHolder}
                        style={{width: "100%", height: "100%"}}
                    >
                        {companiesData.right.map((company) => (
                            <Card key={company.companyId} className={classes.card} draggable
                                  onDragStart={(event) => handleDragStart(event, company)}>
                                <CardContent onDrop={() => {
                                    return false;
                                }}>{company.companyName}</CardContent>
                            </Card>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
export default CompaniesPage;
