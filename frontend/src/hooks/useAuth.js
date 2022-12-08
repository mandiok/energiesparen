import { useState } from "react"



const useAuth = () => {

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [userProfile, setUserProfile] = useState()
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
      }

    const logoutUser = () => {
      console.log("logout wurde aufgerufen")
        setUser(undefined);
        setToken(undefined);
        setUserData(undefined)
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        deleteCookie();
    }


    const getProfileData = async userId => {
      console.log("userid", userId)
      const response = await fetch('/user-data?id=' + userId, {
        method: 'GET',
      })

      const data = await response.json();
      console.log("data",data)
      setUserProfile(data)
      // return(data)
    }


    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser, getProfileData, userProfile];
}

export default useAuth