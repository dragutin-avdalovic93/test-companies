import React from 'react';
import {Button, Typography} from '@mui/material';
import {Routes, Link, Route, Navigate} from 'react-router-dom';
import {HomePage} from './components/HomePage';
import CompaniesList from './components/CompaniesList';
import {PageNotFound} from './components/NotFound';
import {AppBar, Toolbar} from '@mui/material';
import {useSelector} from 'react-redux';
import AddCompanyForm from './components/AddCompany';
import EditCompanyForm from './components/EditCompany';
import {ShowMore} from './components/ShowMore';
import CompaniesPage from './components/CompaniesDragAndDrop';
import {GoogleLoginComponent} from "./components/GoogleLoginComponent";

function App() {
    const {tokenId} = useSelector((state) => state.auth);
    console.log(tokenId);

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
            <Route path="/dnd" element={<CompaniesPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );

    const links = (
        <Toolbar>
            <Button component={Link} to="/" color="inherit">
                {tokenId ? 'Companies' : 'Home'}
            </Button>
            {tokenId && (
                <>
                    <Button component={Link} to="/show-more" color="inherit">
                        Show More
                    </Button>
                    <Button component={Link} to="/dnd" color="inherit">
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
