import {useState} from "react";

const userLogin = (email, password) => {
    const userArray = JSON.parse(localStorage.getItem("userArray"));
    const user = userArray.find(user => user.email === email && user.password === password);
    return user;
}

const Login = () => {
    const [inputField, setInputField] = useState({email: "", password: ""});

    const inputsHandler = (event) => {
        setInputField({...inputField, [event.target.name]: event.target.value});
    }

    const submitButton = () => {
        const user = userLogin(inputField.email, inputField.password);
        if(user) {
            console.log("Login erfolgreich");
        }
        else {
            console.log("Login fehlgeschlagen");
        }
    }

    return (
        <div>
            <h2>Bitte gib folgende Daten zur Anmeldung ein:</h2>
            <p>Email:</p>
            <input 
            type="email" 
            name="email" 
            onChange={inputsHandler} 
            placeholder="E-mail" 
            value={inputField.email}/>

            <br/>
            <p>Passwort:</p>
            <input 
            type="password" 
            name="password" 
            onChange={inputsHandler} 
            placeholder="Passwort" 
            value={inputField.password}/>

            <br/>

            <button onClick={submitButton}>Absenden</button>
        </div>
    )
}

export default Login;

