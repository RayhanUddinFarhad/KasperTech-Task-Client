import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useGetData = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: data = [] } = useQuery(
    ['data', user?.email],
    {
      queryFn: async () => {
        const res = await fetch(`https://kasper-tech-server.vercel.app/csvData/${user?.email}`);
        return res.json();
      },
    }
  );

  const isLoading = !data; // If data is not available, loading is true

  return [data, refetch, isLoading];
};

export default useGetData;
