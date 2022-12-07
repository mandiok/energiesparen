import { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from '../providers/AppContext';
import jwt_decode from "jwt-decode";

//-----------------------------------------------


const AuthVerify = () => {

  const { LOCAL_STORAGE_KEY, user, logoutUser, setToken, setUserData, setUser } = useContext(AppContext);

  let location = useLocation();

  //..........................
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
      setUser(decodedJwt.email);

      // console.log("token:", data.access)
      // console.log('userData:', decodedJwt)
      // console.log("user:", decodedJwt.email)
    } else {
      alert("Token refresh failed");
      logoutUser()
    }
  };

  //......................

  useEffect(() => {

    const ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("ls?", ls)


    
    if (ls !== null) {
      console.log("Prüfe, ob die Zeit abgelaufen ist.")
      const decodedJwt = jwt_decode(ls.access)
      setUserData(decodedJwt);
      setUser(decodedJwt.email);
      console.log(decodedJwt.email)

      // const timeElapsed = Date.now();
      // const today = new Date(timeElapsed);
      // console.log("date:", today)
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
      logoutUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location], []);

  return;
};


export default AuthVerify;