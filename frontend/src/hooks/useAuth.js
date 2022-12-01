import { useState, useEffect } from "react"



const useAuth = () => {

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()

    const LOCAL_STORAGE_KEY = 'accessToken';

    const logoutUser = () => {
        setUser(undefined);
        setToken(undefined);
        setUserData(undefined)
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        deleteCookie();
    }

    const deleteCookie = async () => {
    const response = await fetch('/clear-cookie', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
    }

    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser];
}

export default useAuth