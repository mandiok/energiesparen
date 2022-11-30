import DateToday from "./DateToday";
import { postContext } from "../App";

import { v4 as uuidv4 } from 'uuid';

import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/Button";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AppContext } from "../providers/AppContext";

// -----------------------------------------------------------

const postArray = [{
    id: uuidv4(),
    userId: "asdfasdgfa",
    date: "05. November 2022",
    title: "Wäschetrocknen in der Sonne",
    text: "Heute war wieder ein perfekter Tag, um die Wäsche draußen zu trocknen.",
    link: "",
    picture: "??",
    likes: ["4626-457484-99999", "12341-57895-24521-15415"],
    comments: [
        {
            id: uuidv4(),
            userId: "usernummereins",
            date: "datum",
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
            id: uuidv4(),
            userId: "usernummerdreis",
            date: "datum",
            text: "tua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }
    ]
},
{
    id: uuidv4(),
    userId: uuidv4(),
    date: "11. September 2022",
    title: "Smartphone ausschalten",
    text: "Hey, ich habe es heute geschafft, mein Smartphone für 3 Stunden ausgeschaltet zu lassen! :-)",
    link: "",
    picture: "??",
    likes: ["4626-457484-24526", "12341-57895-24521-15415"],
    comments: [
        {
            id: uuidv4(),
            userId: "usernummer2",
            date: "datum",
            text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,"
        }
    ]
}
]
// ------------------------------------------------------

const InputPost = () => {

    const {addPost, userData} = useContext(AppContext);

    const titelRef = useRef()
    const postRef = useRef()
    const inputRef = useRef()
    const linkRef = useRef()

    const [inputLink, setInputLink] = useState(false)
    const [errorTitle, setErrorTitle] = useState(false)
    const [errorText, setErrorText] = useState(false)
    const [inputVisible, setInputVisible] = useState(false)
    const [sendPost, setSendPost] = useState(false)



    const createPost = () => {
        const newPost = {
            id: uuidv4(),
            userId: userData.id,
            date: DateToday(),
            title: titelRef.current.value,
            text: postRef.current.value,
            link: linkRef.current.value,
            picture: "??",
            likes: [],
            comments: []
        }
        
        titelRef.current.value = "";
        postRef.current.value = "";
        linkRef.current.value = "";
        inputRef.current.value = "";
        setSendPost(true);
        setInputVisible(false);

        addPost(newPost)
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

    // saveImage fehlt                  !!!!!!

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
                            <input
                                hidden accept="image/*"
                                type="file" />
                            <CropOriginalIcon sx={{ color: '#3c850b' }} />
                            <input
                                accept="image/*"
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