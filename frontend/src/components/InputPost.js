import DateToday from "./DateToday";

import { v4 as uuidv4 } from 'uuid';

import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/Button";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Button from "@mui/material/Button";
import { useState, useRef } from "react";

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

    const titelRef = useRef()
    const postRef = useRef()
    const inputRef = useRef()
    const linkRef = useRef()

    const [inputLink, setInputLink] = useState(false)
    const [errorTitle, setErrorTitle] = useState(false)
    const [errorText, setErrorText] = useState(false)

    const [posts, setPosts] = useState(postArray);


    const addPost = () => {
        setPosts([...posts,
            {
                id: uuidv4(),
                userId: "userId",
                date: DateToday(),
                title: titelRef.current.value,
                text: postRef.current.value,
                link: linkRef.current.value,
                picture: "??",
                likes: [],
                comments: []
            }
        ])
        titelRef.current.value = "";
        postRef.current.value = "";
        linkRef.current.value = "";
        inputRef.current.value = "";
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
    addPost();
}

// saveImage fehlt                  !!!!!!

return (

    <Card sx={{ maxWidth: 380, margin: 5, fontSize: 16 }}>
        <CardHeader sx={{ bgcolor: '#ee9003', marginBottom: 2, padding: 1.5 }}
            titleTypographyProps={{
                fontSize: '1.2em',
                color: '#ffffff'
            }}
            title={"Erstelle Deinen neuen Beitrag"}
        />
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
            <AddLinkIcon sx={{ color: '#3c850b', marginRight: 0.5 }}
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
                    rows={3}
                    fullWidth
                    onChange={handleTextChange}
                /> :
                <TextField
                    inputRef={postRef}
                    label="Dein Beitrag"
                    variant="outlined"
                    required
                    multiline
                    rows={3}
                    fullWidth
                />
        }

        <Button
            variant="text"
            onClick={handleSendClick} >
            Senden
        </Button>
    </Card>



)
}

export default InputPost;