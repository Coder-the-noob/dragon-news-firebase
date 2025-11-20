import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase,config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    console.log(user);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    },[]);

    const authInfo = {
        user,
        setUser,
        createUser,
        logOut,
        logIn
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;