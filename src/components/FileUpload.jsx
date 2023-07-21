import React, { useContext, useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { AuthContext } from '../Provider/AuthProvider';

import OrderTable from './OrderTable';
import CsvReader from 'react-csv-reader';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (data) => {
    if (data && data.length > 0) {
      setLoading(true);
      parseCSVData(data);
    }
  };

  const parseCSVData = (csvData) => {
    const formattedData = csvData.map((item) => {
      const formattedItem = {};
      Object.keys(item).forEach((key) => {
        const formattedKey = key
          .split(' ')
          .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
          .join('');

        formattedItem[formattedKey] = item[key];
      });
      formattedItem["email"] = user.email;

      return formattedItem;
    });

    fetch('https://kasper-tech-server.vercel.app/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then((response) => response.text())
      .then((data) => {
        setLoading(false);
        setData(formattedData); // Update the data state with the newly uploaded data
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5} gap={2}>
          <Typography variant="h5" mb={3} fontWeight="bold">
            Upload CSV File
          </Typography>
          <CsvReader 
            onFileLoaded={handleFileChange}
            parserOptions={{
              header: true,
              skipEmptyLines: true,
              transformHeader: (header) =>
                header
                  .split(' ')
                  .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
                  .join(''),
            }}
          >
            <span>Drop CSV file here or click to upload.</span>
          </CsvReader>
          {file && (
            <Typography variant="body1" mt={2} color="textSecondary">
              Selected File: {file.name}
            </Typography>
          )}
         
          <OrderTable data={data} />
        </Box>
      )}
    </>
  );
};

export default FileUpload;
