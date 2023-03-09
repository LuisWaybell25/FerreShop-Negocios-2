import { createContext, useState, useEffect } from "react";

// Firebase
import firebase from '../utils/firebaseConfig';
import { getAuth } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = (props) => {

    // Estados del usuario
    const [user, setUser] = useState(null);

    useEffect(() => {
    
        // Obtener el usuario de firebase
        const unsuscribe = getAuth(firebase).onAuthStateChanged((currentUser) => {
      
          if (!currentUser) {
            setUser(null);
          } else {
            setUser(currentUser);
          }

        });

        return () => unsuscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;