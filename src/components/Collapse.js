import React, {useState, useEffect} from "react";
import {Button, Collapse, Typography, Box} from "@mui/material";
import {makeStyles} from "@mui/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "grey",
        height: "100vh",
        width: "100%"
    },
    innerBox: {
        backgroundColor: "white",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "100px",
        textAlign: "center"
    },
    text: {
        margin: "20px",
        color: "black",
        textAlign: "center",
    },
    button: {
        margin: "20px",
        marginTop: "20px !important"
    },
});

export function ShowMoreCollapse({text, maxLength = 100}) {
    const classes = useStyles();
    const [showMore, setShowMore] = useState(false);
    const [truncatedText, setTruncatedText] = useState("");

    useEffect(() => {
        if (text.length > maxLength) {
            setTruncatedText(`${text.slice(0, maxLength)}...`);
        } else {
            setTruncatedText(text);
        }
    }, [text, maxLength]);

    const toggleShowMore = () => {
        setShowMore((prevShowMore) => !prevShowMore);
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.innerBox}>
                <Typography variant="body1" className={classes.text}>
                    {showMore ? text : truncatedText}
                </Typography>
                <Collapse in={showMore} timeout="auto" unmountOnExit>
                    <Typography variant="body1" className={classes.text}>
                    </Typography>
                </Collapse>
                {text.length > maxLength && (
                    <Button
                        variant="outlined"
                        onClick={toggleShowMore}
                        className={classes.button}
                    >
                        {showMore ? "Show less" : "Show more"}
                    </Button>
                )}
            </Box>
        </Box>
    );
}

ShowMoreCollapse.propTypes = {
    text: PropTypes.string.isRequired,
    maxLength: PropTypes.number.isRequired
};


export default ShowMoreCollapse;
