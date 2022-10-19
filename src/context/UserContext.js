import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser] = useState({})//displayName:'Araf'
    const [loading, setLoading] = useState(true); //after loading-orders it will not show login page loading......
    const googleProvider = new GoogleAuthProvider();//for sign-in with google

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn =(email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider)//for sign-in with google
    }
    const logOut = () =>{
        return signOut(auth);
    }

    //unsubscribe for changing user in many place
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);//after loading-orders it will not show login page, loading......
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {user, loading, createUser, signIn, logOut, signInWithGoogle} //for using everywhere
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
            
    );
};

export default UserContext;