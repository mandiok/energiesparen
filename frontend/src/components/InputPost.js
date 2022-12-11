import DateToday from "./DateToday";
import { AppContext } from "../providers/AppContext";
//...................................................
import { useState, useRef, useContext } from "react";

import { v4 as uuidv4 } from 'uuid';

import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/Button";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


// -----------------------------------------------------------

const InputPost = () => {

    const { userData, addPost, addPostsToBackend2 } = useContext(AppContext);

    const titelRef = useRef()
    const postRef = useRef()
    const inputRef = useRef()
    const linkRef = useRef()

    const [inputLink, setInputLink] = useState(false)
    const [errorTitle, setErrorTitle] = useState(false)
    const [errorText, setErrorText] = useState(false)
    const [inputVisible, setInputVisible] = useState(false)
    const [sendPost, setSendPost] = useState(false)
    const [picture, setPicture] = useState()

    //..........................

    const createPost = () => {
        const newPost = {
            id: uuidv4(),
            userId: userData.id,
            userName: userData.user_name,
            date: DateToday(),
            title: titelRef.current.value,
            text: postRef.current.value,
            link: linkRef.current.value,
            picture: "",
            likes: [],
            comments: []
        }

        console.log("newPost", newPost)
        titelRef.current.value = "";
        postRef.current.value = "";
        linkRef.current.value = "";
        inputRef.current.value = "";

        addPost(newPost)
        setSendPost(!sendPost);

        if (picture) {
            console.log("\n picture vorhanden \n")
            var formData = new FormData();
            formData.append('file', picture)
        } else {
            console.log("\n kein picture vorhanden")
            var formData = new FormData();
        }

        addPostsToBackend2(newPost, formData, setInputVisible)
        setPicture()
    }

//.................................................

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setPicture(e.target.files[0])
    }

    const handleSendClick = () => {
        if (titelRef.current.value === "")
            setErrorTitle(true)
        if (postRef.current.value === "")
            setErrorText(true)
        if ((!errorTitle && !errorText) && (titelRef.current.value !== "") && (postRef.current.value !== ""))
            createPost();
    }

    const handleShowInputClick = () => {
        setInputVisible(!inputVisible)
    }

    const handleAddLink = () => {
        setInputLink(!inputLink);
    }

    const handleTitelChange = () => {
        setErrorTitle(false)
    }

    const handleTextChange = () => {
        setErrorText(false)
    }

    //.................................................

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: 'column',
            mt: 2,
            margin: 1,
            padding: 2
        }}>
            <Button
                sx={{
                    color: '#3B8DBF',
                    bgcolor: '#dae6ee',
                    fontWeight: 'bold'
                }}
                onClick={handleShowInputClick}
                aria-label="share">
                Neuer Beitrag
            </Button>
            {
                inputVisible ?
                    <Card sx={{
                        mb: 1,
                        mt: 2,
                        padding: 2,
                        fontSize: 16
                    }} >
                        {
                            errorTitle ?
                                <TextField
                                    error
                                    inputRef={titelRef}
                                    required
                                    label="Eingabe erforderlich"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleTitelChange} />
                                :
                                <TextField
                                    inputRef={titelRef}
                                    required
                                    label="Titel"
                                    variant="outlined"
                                    size="small"
                                    fullWidth />
                        }
                        <IconButton
                            disableRipple
                            aria-label="upload picture"
                            component="label"
                        >
                            <input      //Bild
                                hidden accept="image/*"
                                type="file"
                                onChange={(e) => handleFileChange(e)}
                            /> 

                            <CropOriginalIcon sx={{ color: '#3c850b', 
                            bgcolor: picture ? "grey" : null,
                            borderRadius: "5px"}} />
                            <input     
                                // accept="image/*"
                                type="text"
                                ref={inputRef}
                                hidden
                            />
                        </IconButton>

                        <IconButton disableRipple>
                            <AddLinkIcon sx={{
                                color: '#3c850b',
                                marginRight: 0.5
                            }}
                                onClick={handleAddLink} />
                            <input
                                type="text"
                                ref={linkRef}
                            />
                        </IconButton>
                        {
                            errorText ?
                                <TextField
                                    error
                                    inputRef={postRef}
                                    required
                                    label="Eingabe erforderlich"
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    onChange={handleTextChange}
                                /> :
                                <TextField
                                    inputRef={postRef}
                                    label="Dein Beitrag"
                                    variant="outlined"
                                    required
                                    multiline
                                    rows={5}
                                    fullWidth
                                />
                        }
                        <Button
                            variant="text"
                            onClick={handleSendClick} >
                            Senden
                        </Button>

                    </Card >
                    : null
            }
            {sendPost ?
                <Box>
                    <p>Vielen Dank! </p>
                    <p>Dein Beitrag ist nun online.</p>
                </Box>
                : null}
        </Box >
    )
}

export default InputPost;