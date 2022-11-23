import Post from "./Post";
import { Container, Box } from "@mui/material";
import { useState } from "react";
import { postContext } from "../App";

import { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

//---------------------------------------------------------------------


const Feed = () => {

    const [selection, setSelection] = useState('Datum');

    const {posts} = useContext(postContext)

    const handleChange = (event) => {
        setSelection(event.target.value);
    }

    // const postArray = [{
    //     id: "01",
    //     userId: "asdfasdgfa",
    //     date: "23. Oktober 2022",
    //     title: "Wäschetrocknen in der Sonne",
    //     text: "Heute war wieder ein perfekter Tag, um die Wäsche draußen zu trocknen. Wer eine Terrasse, einen Garten oder einen Balkon hat, braucht keinen Trockner!",
    //     link: "",
    //     picture: "??",
    //     likes: ["4626-457484-99999", "12341-57895-24521-15415"],
    //     comments: [
    //         {
    //             id: uuidv4(),
    //             userId: "usernummereins",
    //             date: "datum",
    //             text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    //         },
    //         {
    //             id: uuidv4(),
    //             userId: "usernummerdreis",
    //             date: "datum",
    //             text: "tua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    //         }
    //     ]
    // },
    // {
    //     id: "02",
    //     userId: uuidv4(),
    //     date: "26. Oktober 2022",
    //     title: "Smartphone ausschalten",
    //     text: "Hey, ich habe es heute geschafft, mein Smartphone für 3 Stunden ausgeschaltet zu lassen! :-) Fühlte sich komisch an, aber ich gabe es geschafft.",
    //     link: "",
    //     picture: "??",
    //     likes: ["4626-457484-24526", "12341-57895-24521-15415", "cdb63720-9628-5ef6-bbca-2e094f3c", "cd20-9628-5ef6-bbca-e6094f3c"],
    //     comments: [
    //         {
    //             id: uuidv4(),
    //             userId: "usernummer2",
    //             date: "datum",
    //             text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,"
    //         }
    //     ]
    // },
    // {
    //     id: "03",
    //     userId: uuidv4(),
    //     date: "01. November 2022",
    //     title: " T-Shirt",
    //     text: "sequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue ",
    //     link: "",
    //     picture: "??",
    //     likes: ["4626-457484-24526"],
    //     comments: []
    // },
    // {
    //     id: "04",
    //     userId: uuidv4(),
    //     date: "06. November 2022",
    //     title: "Pullover statt T-Shirt",
    //     text: "dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue, ril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet ",
    //     link: "",
    //     picture: "??",
    //     likes: ["4626-457484-24526", "2354-2345265-246267"],
    //     comments: [
    //         {
    //             id: uuidv4(),
    //             userId: "usernummer3",
    //             date: "datum",
    //             text: "Duiait nulla facilisi. Lorem ipsum dolor sit amet,"
    //         }
    //     ]
    // },
    // {
    //     id: "05",
    //     userId: uuidv4(),
    //     date: "09. November 2022",
    //     title: "19 Grad Celcius",
    //     text: "dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue, ril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit pra",
    //     link: "",
    //     picture: "??",
    //     likes: ["4626-457484-24526", "2354-2345265-246267", "cd20-9628-5ef6-bbca-e6094f3c"],
    //     comments: []
    // },
    // {
    //     id: "06",
    //     userId: uuidv4(),
    //     date: "10. November 2022",
    //     title: "Dummy Text",
    //     text: " odio dignissim qui blandit praesent luptatum zzril delenit augue, ril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit pra",
    //     link: "",
    //     picture: "??",
    //     likes: ["2354-2345265-246267", "cd20-9628-5ef6-bbca-e6094f3c"],
    //     comments: []
    // },
    // {
    //     id: "07",
    //     userId: uuidv4(),
    //     date: "12. November 2022",
    //     title: "Smartphones",
    //     text: "Ich habe einen interessanten Artikel gelesen, wie viel Strom wir täglich mit unseren Smartphones verbrauchen. Wirklich guter Artikel, den ich Euch hier weiter empfehle..... ",
    //     link: "",
    //     picture: "??",
    //     likes: ["4626-457484-24526", "12341-57895-24521-15415", "cd20-9628-5ef6-bbca-e6094f3c"],
    //     comments: [
    //         {
    //             id: uuidv4(),
    //             userId: "usernummer24",
    //             date: "datum",
    //             text: "Duisolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,"
    //         }
    //     ]
    // }
    // ]

    const steps = 2
    

    // const [posts, setPosts] = useState(postArray);
    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(indexStart + steps);

    //----------
    const sort = (sortSelection) => {

        if (sortSelection === "Likes") {

            let array = [];
            for (let i = 0; i < posts.length; i++) {
                array.push([posts[i].likes.length, posts[i].id]);
            }

            array.sort(function (a, b) {
                return a[0] - b[0]
            })

            array.reverse();

            let postsorted = [];
            for (let k = 0; k < posts.length; k++) {
                for (let n = 0; n < array.length; n++) {
                    {
                        if (array[k][1] === posts[n].id) {
                            postsorted.push(posts[n]);
                        }
                    }
                }
            }
            return postsorted
        }
        else if (sortSelection === "Datum") {
            return (posts)
        }
    }

    const handleSlideLClick = () => {
        setIndexStart(indexStart - steps)
        setIndexEnd(indexEnd - steps)
    }
    const handleSlideRClick = () => {
        setIndexStart(indexStart + steps)
        setIndexEnd(indexEnd + steps)
    }

    // -----------------------------------------------------------        

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                flexDirection: 'column',
                bgcolor: '#80BF6F',
                padding: 1,
            }}>
            <Box sx={{
                padding: 1.5,
                bgcolor: '#fff',
                margin: 1,
                borderRadius: 1.0,
            }}>
                <FormControl size='small' sx={{ width: 140, mb: 0 }}>
                    <InputLabel id="demo-simple-select-label">Sortiere nach</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selection}
                        label="Sortiere nach"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Datum"}>Datum</MenuItem>
                        <MenuItem value={"Likes"}>Likes</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }} >
                {
                    posts &&
                    sort(selection).slice(indexStart, indexEnd).map(e => (

                        <Post
                            key={e.id}
                            post={e}
                            userName={e.user_name}
                            userId={e.id}
                            firstName={e.first_name}
                        />
                    ))
                }
                <div>
                    {
                        indexStart > 1 ?
                            <ArrowLeftIcon fontSize="large" onClick={handleSlideLClick} />
                            : null
                    }
                    {
                        indexEnd < posts.length ?
                            <ArrowRightIcon fontSize="large" onClick={handleSlideRClick} />
                            : null
                    }
                </div>
            </Box>
        </Container>
    )
}


export default Feed;
