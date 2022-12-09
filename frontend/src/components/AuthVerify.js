import { AppContext } from '../providers/AppContext';
//.....................................................
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

//-----------------------------------------------


const AuthVerify = () => {

  const { LOCAL_STORAGE_KEY, logoutUser, setToken, setUserData, setUser, posts } = useContext(AppContext);

  let location = useLocation();

  //.................................................
  const verifyToken = async (user) => {

    const response = await fetch('/refreshtoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const data = await response.json();
    if (data.status === "ok") {

      localStorage.removeItem(LOCAL_STORAGE_KEY);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))

      setToken(data.access)
      var decodedJwt = jwt_decode(data.access);
      setUserData(decodedJwt);
      // console.log("test:", userData)
      setUser(decodedJwt.email);

    } else {
      alert("Token refresh failed");
      logoutUser()
    }
  };

  //................................................
  // Schaue mit dem accessToken, ob die Zugriffszeit abgelaufen ist.
  // wenn nicht, erneuere die Zugriffszeit, sonst => logout

  // console.log("Loc", location)

  useEffect(() => {

    const ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    
    if (ls !== null) {
      console.log("Prüfe, ob die Zeit abgelaufen ist.")
      const decodedJwt = jwt_decode(ls.access)
      setUserData(decodedJwt);
      // console.log("test:" ,userData)
      setUser(decodedJwt.email);

      // expTime, setExpTime
      console.log("Zeitdifferenz:", (decodedJwt.exp * 1000) - Date.now())

      if (decodedJwt.exp * 1000 > Date.now()) {

        console.log("Zeit noch nicht abgelaufen. Refreshe den Zugangstoken.")
        verifyToken(decodedJwt.email);
      } else {
        console.log("Token abgelaufen")
        logoutUser()
      }
    }
    else {
      console.log("Logout")
      logoutUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, posts]);

  return;
};


export default AuthVerify;