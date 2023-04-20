import React, {useState} from 'react';
import {Typography, Button} from "@mui/material";

export function ShowMore({text, maxLenght = 100}) {

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    const truncatedText = showMore ? text : `${text.slice(0, maxLenght)}...`;
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <Typography variant="body1" style={{margin: "20px"}}>
                {truncatedText}
            </Typography>
            {text.length > maxLenght && (
                <Button onClick={toggleShowMore}>
                    {showMore ? 'Show less' : 'Show more'}
                </Button>
            )
            }
        </div>
    );
}