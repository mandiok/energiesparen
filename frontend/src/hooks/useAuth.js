import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";


const useAuth = () => {

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()

    const LOCAL_STORAGE_KEY = 'token'

    useEffect(() => {
        const lstorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            if (lstorage) {
            const jwt_decoded = jwt_decode(lstorage.access)
            setUser(jwt_decoded.email)
            setUserData(jwt_decoded)
        } else {
            logoutUser()
        }

    }, [])

    const logoutUser = () => {
        setUser(undefined);
        setToken(undefined);
        setUserData(undefined)
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser];
}

export default useAuth