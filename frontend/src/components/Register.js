import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

var userArray = [];


function Register() {

    const [inputField , setInputField] = useState({
        id: uuidv4(),
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        message: "",
        url:"",
        
    })



    const inputsHandler = (e) =>{
        const { name, value } = e.target;
       setInputField((prevState) => ({
         ...prevState,
         [name]: value,
       }));
    }
    const saveToLocalStorage = () => {
        localStorage.setItem("userArray", JSON.stringify(userArray));
      };
    const submitButton = () =>{
        if (inputField["last_name"].length <= 2){
          alert ("Name must be at least 3 characters long");
        }
        if (inputField["email"].indexOf("@") === -1 ){
          alert ("The email should contain @");
        }
        else {
        userArray.push(inputField);
        console.log(userArray);
        saveToLocalStorage(userArray);
        }
    }

    return (
        <div>
            <h2>Bitte gib folgende Daten zur Registrierung ein:</h2>
            <p>Vorname:</p>
            <input 
            type="text" 
            name="first_name" 
            onChange={inputsHandler} 
            placeholder="Vorname" 
            value={inputField.first_name}/>

            <br/>
            <p>Nachname:</p>
            <input 
            type="text" 
            name="last_name" 
            onChange={inputsHandler} 
            placeholder="Nachname" 
            value={inputField.last_name}/>

            <br/>
            <p>Email:</p>
            <input 
            type="email" 
            name="email" 
            onChange={inputsHandler} 
            placeholder="E-mail" 
            value={inputField.email}/>

            <p>Passwort:</p>
            <input
            type="password"
            name="password"
            onChange={inputsHandler}
            placeholder="Passwort"
            value={inputField.password}/>

            <br/>
            <p>Deine persönliche Nachricht:</p>
            <input 
            type="text" 
            name="message"
            onChange={inputsHandler} 
            placeholder="Message" 
            value={inputField.message}/>
            <br/>
            <p>Hast Du eine Homepage?</p>
            <input 
            type="url" 
            name="url" 
            onChange={inputsHandler} 
            placeholder="Homepage" 
            value={inputField.url}/>
            <br/>

            <button onClick={submitButton}>Absenden</button>
        </div>
    )
}

export default Register