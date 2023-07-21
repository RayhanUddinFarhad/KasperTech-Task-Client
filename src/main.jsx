import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import InvoiceTable from './components/InvoiceTable.jsx';
import LogIn from './pages/LogIn.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRoutes from './components/Routes/PrivateRoute.jsx';
import PrivateRoute from './components/Routes/PrivateRoute.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App></App></PrivateRoute>,
  },


  {
    path : "/invoice/:id",
    element : <InvoiceTable></InvoiceTable>,
    loader : ({params}) => fetch(`https://kasper-tech-server.vercel.app/csvDataOne/${params.id}`)
  },

  {
    path : "/logIn",
    element : <LogIn></LogIn>
  },
  {
    path : "/register",
    element : <Register></Register>
  },


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider  client={queryClient}>

    <RouterProvider router={router} />

    </QueryClientProvider>




    </AuthProvider>

    
</React.StrictMode>,
)
