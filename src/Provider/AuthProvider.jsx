import React, { Children, createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebase.config';


const auth = getAuth(app);
export const AuthContext = createContext  (null)
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState (null)

    const [loader, setLoader] = useState (true)




    const register = (email, password) => {

        setLoader (true)


      return  createUserWithEmailAndPassword (auth,  email,  password)
    }


    const logIn = (email, password) => { 
        setLoader (true)


        return signInWithEmailAndPassword (auth, email, password)
    }

    const logOut = () => {
        setLoader (true)


        return signOut (auth)
    }

    const googleLogin = () => { 
        setLoader (true)

        return signInWithPopup (auth, provider)



    }



    useEffect (() => {

        const unsubscribe = onAuthStateChanged  (auth, currentUser => {


            setUser (currentUser)
            setLoader (false)
        })

        return () => unsubscribe()


       
    }, [])

    const contextInfo = {

        user,

        register, 
        logIn,
        logOut,
        googleLogin,
        loader
    }






    return (
        <AuthContext.Provider value={contextInfo}>

            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;