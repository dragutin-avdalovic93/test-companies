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
import Dialog from '@mui/material/Dialog'
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


import {fetchCompanies} from "../api/companiesService";
import {removeCompany} from '../api/companyService';
import {Link, useNavigate} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    tableContainer: {
        marginTop: 20,
        marginBottom: 20,
        maxHeight: '65vh',
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
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setDeleteId(null);
    };

    const dispatch = useDispatch();
    const companiesData = useSelector(state => state.companies);
    const tokenId = useSelector((state) => state.user.tokenId);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
        dispatch(fetchCompanies(event.target.value, 1, rowsPerPage));
    }

    const handleChangePage = (event, newPage) => {
        if (newPage <= 0) {
            newPage = 0;
        }
        setPage(page => newPage);
        dispatch(fetchCompanies(searchTerm, newPage + 1, rowsPerPage));
    }


    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        //const newPageCount = Math.floor(companiesData.itemCount / newRowsPerPage);
        const newPage = 1;
        setRowsPerPage(rowsPerPage => newRowsPerPage);
        setPage(page => 0);
        dispatch(fetchCompanies(searchTerm, 1, newRowsPerPage));
    }

    const handleEdit = (id) => {
        navigate('/edit/' + id);
    }

    const handleDelete = (id) => {
        setOpen(true);
        setDeleteId(id);
    }
    const handleConfirm = () => {
        dispatch(removeCompany(deleteId, tokenId)).then(() => {
            dispatch(fetchCompanies('', 1, rowsPerPage));
            setPage(0)
        });
        setOpen(false);
    }

    useEffect(() => {
        dispatch(fetchCompanies(searchTerm, page, rowsPerPage));
        setPage(0);
    }, []);

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
                <Button size="large" component={Link} to="/new" variant="contained" color="primary"
                        style={{margin: "10px 10px 0 10px"}}>
                    Create/New
                </Button>
            </div>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Delete Company"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this company?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" variant={"outlined"}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} color="warning" variant={"outlined"}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign: 'center', backgroundColor: "grey", color: "whitesmoke"}}>
                                Company Name
                            </TableCell>
                            <TableCell style={{textAlign: 'center', backgroundColor: "grey", color: "whitesmoke"}}>
                                Edit
                            </TableCell>
                            <TableCell style={{textAlign: 'center', backgroundColor: "grey", color: "whitesmoke"}}>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companiesData.items.map((company) => (
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
                count={!companiesData.itemCount || companiesData.itemCount <= 0 ? 0 : companiesData.itemCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </>
    );
}

export default CompaniesList;