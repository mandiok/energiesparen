import { useState } from "react"



const useAuth = () => {

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()

    const LOCAL_STORAGE_KEY = 'accessToken';

    const deleteCookie = async () => {
      const response = await fetch('/clear-cookie', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data)
      }

    const logoutUser = () => {
      console.log("logout wurde aufgerufen")
        setUser(undefined);
        setToken(undefined);
        setUserData(undefined)
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        deleteCookie();
    }



    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser];
}

export default useAuth