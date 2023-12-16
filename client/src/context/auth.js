import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoggedIn = createContext();

const LoggedInProvider = ({ children }) => {

    const [User,setUser] = useState();

    const [isLoggedIn, setisLoggedIn] = useState(() => {
        const storedLog = localStorage.getItem('log');
        return storedLog ? JSON.parse(storedLog) : false;
    });

    useEffect(() => {
        localStorage.setItem('log', JSON.stringify(isLoggedIn));
        localStorage.setItem("user",JSON.stringify(User));
    },[isLoggedIn]);

    const value = {
        isLoggedIn,
        setisLoggedIn,
    };

    return (
        <LoggedIn.Provider value={value}>
            {children}
        </LoggedIn.Provider>
    )
}



export const LoggedState = () => {
    return useContext(LoggedIn); //Custom Hook Type
};

export default LoggedInProvider;

