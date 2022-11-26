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

    const { posts } = useContext(postContext)

    const handleChange = (event) => {
        setSelection(event.target.value);
    }

    // Anzahl Posts im Feed, die angezeigt werden. 
    // Um weitere zu sehen, gibt es unten Pfeile zum "Blättern"
    const steps = 3

    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(indexStart + steps);


    //----------------------------------
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

    // Berechnet die Indizes für den ersten und letzten anzuzeigenden Post neu,
    // wenn auf "nach links blätern" angeklickt wurde
    const handleSlideLClick = () => {
        const length = posts.length;
        if (indexEnd < length) {
            setIndexStart(indexStart - steps)
            setIndexEnd(indexEnd - steps)
        } else {
            setIndexStart(indexStart - steps)
            setIndexEnd(indexStart - (length - (indexEnd)))
        }
    }

    // Berechnet die Indizes für den ersten und letzten anzuzeigenden Post neu,
    // wenn auf "nach rechts blätern" angeklickt wurde
    const handleSlideRClick = () => {
        const length = posts.length;
        setIndexStart(indexStart + steps)
        if ((indexEnd + steps) < length) {
            setIndexEnd(indexEnd + steps)
        } else {
            setIndexEnd(length)
        }
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
