import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from "@mui/styles";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import store from "../app/store";


import {fetchCompanies} from "../features/companies/companiesReducer";
import {removeCompany} from '../features/company/companyReducer';
import {Link, useNavigate} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    tableContainer: {
        marginTop: 20,
        marginBottom: 20,
        maxHeight: 440,
        maxWidth: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    }
});


const CompaniesList = () => {
    const navigate = useNavigate();

    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const companiesData = useSelector(state => state.companies);
    console.log(companiesData);

    const tokenId = useSelector((state) => state.auth.tokenId);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        dispatch(fetchCompanies(event.target.value, page, rowsPerPage));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(fetchCompanies(searchTerm, newPage, rowsPerPage));
    }

    const handleChange = (event, newPage) => {
        setPage(newPage);
        dispatch(fetchCompanies(searchTerm, newPage, rowsPerPage));
    }


    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        dispatch(fetchCompanies(searchTerm, 0, parseInt(event.target.value, 10)));
    }

    const handleEdit = (id) => {
        navigate('/edit/' + id);
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(removeCompany(id, tokenId));
        } else {
            alert('Deleting canceled!');
        }
    }

    useEffect(() => {
        dispatch(fetchCompanies(searchTerm, page, rowsPerPage))
    }, [dispatch, searchTerm, page, rowsPerPage]);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                maxWidth: "80%",
                margin: "auto"
            }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <Button size="normal" component={Link} to="/new" variant="contained" color="primary"
                        style={{margin: 20}}>
                    Create/New
                </Button>
            </div>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign: 'center'}}>
                                Company Name
                            </TableCell>
                            <TableCell style={{textAlign: 'center'}}>
                                Edit
                            </TableCell>
                            <TableCell style={{textAlign: 'center'}}>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companiesData.items.slice(
                            page * rowsPerPage, page * rowsPerPage + rowsPerPage
                        ).map((company) => (
                            <TableRow key={company.companyId} style={{textAlign: 'center'}}>
                                <TableCell style={{textAlign: 'center'}}>{company.companyName}</TableCell>
                                <TableCell style={{textAlign: 'center'}}>
                                    <IconButton onClick={() => handleEdit(company.companyId)}>
                                        <EditIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{textAlign: 'center'}}>
                                    <IconButton onClick={() => handleDelete(company.companyId)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{
                    maxWidth: "80%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={companiesData.itemCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChange={handleChange}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </>
    );
}

export default CompaniesList;