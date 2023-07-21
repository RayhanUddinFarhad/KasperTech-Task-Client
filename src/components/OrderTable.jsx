import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal, Typography, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useGetData from '../hooks/useGetData';
import { parse } from 'papaparse';
import moment from 'moment/moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderTable = ({loading}) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, isLoading] = useGetData();
  const [modalData, setModalData] = useState([]);

  const showData = (id) => {
    console.log(id);
    const specificData = data.find((data) => data._id === id);
    setModalData(specificData);
  };

  const calculateTotalAmount = (unitPrice, quantity) => {
    return parseFloat(unitPrice) * parseFloat(quantity);
  };

  console.log(modalData);

  return (
    <>
      {
        loading ?
        <CircularProgress></CircularProgress> :

       <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Item Name</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Generate Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div onClick={handleOpen}>
                    <Button onClick={() => showData(row?._id)}>{row?.OrderID}</Button>
                  </div>
                </TableCell>
                <TableCell align="right">{row?.Customer}</TableCell>
                <TableCell align="right">{row?.ItemName}</TableCell>
                <TableCell align="right">
                  {calculateTotalAmount(row?.UnitPrice, row?.Quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">{moment(row?.OrderDate).format('L')}</TableCell>
                <TableCell align="right">
                  <Link to={`/invoice/${row?.OrderID}`} >
                    <Button variant='contained'>
                    Generate Invoice
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order ID: {modalData.OrderID}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Customer Name: {modalData.Customer}
          </Typography>
          <Typography sx={{ mt: 2 }}>Item: {modalData.ItemName}</Typography>
          <Typography sx={{ mt: 2 }}>Quantity: {modalData.Quantity}</Typography>
          <Typography sx={{ mt: 2 }}>Price: ${modalData.UnitPrice}</Typography>
        </Box>
      </Modal>
       </>
        
      }
    </>
  );
};

export default OrderTable;
