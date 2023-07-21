import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './components/FileUpload'
import { AuthContext } from './Provider/AuthProvider'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const navigation = useNavigate()
  const {user, logOut} = useContext(AuthContext)

  console.log(user);


  const signOut = () => {

    logOut()
    navigation('/')


  }

  return (
    <>
    <h5>{user?.email}</h5>
    <Button onClick={signOut} variant="contained">Log Out</Button>
    <FileUpload></FileUpload>
    </>
  )
}

export default App
