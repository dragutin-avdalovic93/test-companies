import React from 'react';
import {Button} from '@mui/material';
import {Routes, Link, Route} from 'react-router-dom';
import CompaniesList from './components/CompaniesList';
import {PageNotFound} from './components/NotFound';
import {AppBar, Toolbar} from '@mui/material';
import {useSelector} from 'react-redux';
import AddCompanyForm from './components/AddCompany';
import EditCompanyForm from './components/EditCompany';
import {ShowMore} from './components/ShowMore';
import CompaniesPage from './components/CompaniesDragAndDrop';
import {GoogleLoginComponent} from "./components/GoogleLoginComponent";
import {ShowMoreCollapse} from "./components/Collapse";

function App() {
    const {tokenId} = useSelector((state) => state.user);

    const routes = (
        <Routes>
            {tokenId ? <Route path="/" element={<CompaniesList/>}/> :
                <Route path="/" element={<GoogleLoginComponent/>}/>}

            <Route path="/new" element={<AddCompanyForm/>}/>
            <Route path="/edit/:companyId" element={<EditCompanyForm/>}/>
            <Route
                path="/show-more"
                element={
                    <ShowMore
                        text="TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTes
                        tTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
                        TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTes
                        tTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
                        TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTes
                        tTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTest"/>
                }
            />
            <Route
                path="/collapse"
                element={
                    <ShowMoreCollapse
                        text="TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTes
                        tTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
                        TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestT
                        estTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTes
                        tTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
                        TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTes
                        tTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe
                        stTestTestTestTestTestTestTest" maxLength="100"/>
                }
            />
            <Route path="/dnd" element={<CompaniesPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );

    const links = (
        <Toolbar>
            <Button component={Link} to="/" color="inherit" variant="outlined" style={{margin: '0 10px 0 0'}}>
                {tokenId ? 'Companies' : 'Home'}
            </Button>
            {tokenId && (
                <>
                    <Button component={Link} to="/show-more" color="inherit" variant="outlined"
                            style={{margin: '0 10px 0 0'}}>
                        Show More
                    </Button>
                    <Button component={Link} to="/collapse" color="inherit" variant="outlined"
                            style={{margin: '0 10px 0 0'}}>
                        Collapse
                    </Button>
                    <Button component={Link} to="/dnd" color="inherit" variant="outlined"
                            style={{margin: '0 10px 0 0'}}>
                        Drag and Drop
                    </Button>
                </>
            )}
        </Toolbar>
    );

    return (
        <div className="App">
            <AppBar position="static">{links}</AppBar>
            {routes}
        </div>
    );
}

export default App;
