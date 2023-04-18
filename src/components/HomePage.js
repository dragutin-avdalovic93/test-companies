import {Typography} from "@mui/material";
import {GoogleLoginComponent} from './GoogleLoginComponent';


export function HomePage() {
    return (
        <div>
            <Typography style={{marginTop: "20px",}} variant="h6">Ovo je aplikacija za menadzment kompanija, molim vas
                ulogujte
                se
                preko
                googla</Typography><br/>
            <GoogleLoginComponent/>
        </div>
    );
}