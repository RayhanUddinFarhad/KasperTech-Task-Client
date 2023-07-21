import React, { useContext, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography, createTheme, ThemeProvider, Button } from '@mui/material';
import { AuthContext } from '../Provider/AuthProvider';
import moment from 'moment';
import html2pdf from 'html2pdf.js';


const theme = createTheme({
    typography: {
        h3: {
            color: '#6c63ff',
            fontWeight: 'bold',
        },
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f1e7f9',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#c63ff',
    fontWeight: 'bold',
}));

const InvoiceTable = () => {
    const data = useLoaderData();

    const {user} = useContext(AuthContext)

    const calculateTotalAmount = (unitPrice, quantity) => {
        return parseFloat(unitPrice) * parseFloat(quantity);
    };

    const totalAmountSum = data.reduce(
        (accumulator, row) =>
            accumulator + parseFloat(calculateTotalAmount(row.UnitPrice, row.Quantity)),
        0
    );


    const componentRef = useRef();

  const handleDownloadPdf = () => {
    const element = document.getElementById('invoice-page');
    html2pdf().from(element).save();
  };

    return (
        <ThemeProvider theme={theme}>
                        <Button onClick={handleDownloadPdf} variant='contained'>Download Pdf</Button>

            <div id='invoice-page' ref={componentRef}>

                <Typography variant='h5' gutterBottom>Invoice No: {data && data[0].OrderID}</Typography>
                <Typography variant='subtitle1' gutterBottom>Invoice Date:  {moment(data && data[0].OrderDate).format("MMM M, Y")}</Typography>
                <Typography variant='subtitle1' gutterBottom>Invoice Due: {moment().format("MMM M, Y")}</Typography>

                <Stack direction="row" spacing={2} justifyContent='center' alignItems='center' marginBottom={2}>
                    <Item variant='h3' color='textPrimary'>
                        <Typography variant="h4" color="primary">Billed by {user?.email}</Typography>
                        <Typography variant="body1">Dhaka, Bangladesh</Typography>
                    </Item>
                    <Item variant='h3' color='textPrimary'>
                        <Typography variant="h4" color="primary">Billed to {data && data[0].Customer}</Typography>
                        <Typography variant="body1">Dhaka, Bangladesh</Typography>
                    </Item>
                </Stack>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="right">Item</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">Rate</StyledTableCell>
                                <StyledTableCell align="right">Amount</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((row, number) => (
                                <StyledTableRow key={row?._id}>
                                    <StyledTableCell align="right">{number + 1}</StyledTableCell>
                                    <StyledTableCell align="right">{row?.ItemName}</StyledTableCell>
                                    <StyledTableCell align="right">{row?.Quantity}</StyledTableCell>
                                    <StyledTableCell align="right">{row?.UnitPrice}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {calculateTotalAmount(row?.UnitPrice, row?.Quantity).toFixed(2)}
                                    </StyledTableCell>                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <h3>Total USD: {totalAmountSum.toFixed(2)}</h3>
            </div>
        </ThemeProvider>
    );
};

export default InvoiceTable;
