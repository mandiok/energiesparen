import Post from "./Post";
import { Container, Box } from "@mui/material";
import { useState } from "react";
import { AppContext } from "../providers/AppContext";

import { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

//---------------------------------------------------------------------


const Feed = () => {

    const [selection, setSelection] = useState('Datum');
    const [filter, setFilter] = useState('alle');

    const { posts, userData } = useContext(AppContext)



    // Anzahl Posts im Feed, die angezeigt werden. 
    // Um weitere zu sehen, gibt es unten Pfeile zum "Blättern"
    const steps = 1

    const handleChange = (event) => {
        setSelection(event.target.value);
        setIndexStart(0);
        setIndexEnd(steps);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(indexStart + steps);

    let postsArray = [];

    //...............................
    const defArray = () => {

        if (filter === 'alle') {
            postsArray = [...posts];
        }
        else if (filter === 'deine') {
            postsArray = posts.filter(e => {
                return (e.userId === userData.id)
            })
        }
        return postsArray;
    }

    //----------------------------------
    const sort = (sortSelection) => {

        postsArray = defArray();

        if (sortSelection === "Likes") {

            let array = [];
            for (let i = 0; i < postsArray.length; i++) {
                array.push([postsArray[i].likes.length, postsArray[i].id]);
            }

            array.sort(function (a, b) {
                return a[0] - b[0]
            })

            array.reverse();

            let postsorted = [];
            for (let k = 0; k < postsArray.length; k++) {
                for (let n = 0; n < array.length; n++) {
                    {
                        if (array[k][1] === postsArray[n].id) {
                            postsorted.push(postsArray[n]);
                        }
                    }
                }
            }
            return postsorted
        }
        else if (sortSelection === "Datum") {
            return (postsArray.reverse())
        }
    }

    // Berechnet die Indizes für den ersten und letzten anzuzeigenden Post neu,
    // wenn auf "nach links blätern" angeklickt wurde
    const handleSlideLClick = () => {

        let length;
        if (filter === 'alle')
            length = posts.length;
        else if (filter === 'deine')
            length = postsArray.length;

        if (indexEnd < length) {
            setIndexStart(indexStart - steps)
            setIndexEnd(indexEnd - steps)
        } else {
            const tmpstart = indexStart
            setIndexStart(indexStart - steps)
            setIndexEnd(tmpstart)
        }
    }

    // Berechnet die Indizes für den ersten und letzten anzuzeigenden Post neu,
    // wenn auf "nach rechts blätern" angeklickt wurde
    const handleSlideRClick = () => {

        let length;
        if (filter === 'alle')
            length = posts.length;
        else if (filter === 'deine')
            length = postsArray.length;

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
                bgcolor: '#e1f3d9',
                padding: 1,
                width: "100%"
            }}>
            <Box sx={{
                padding: 1.0,
                bgcolor: '#fff',
                margin: 1,
                borderRadius: 1.0,
            }}>
                <div style={{ dislpay: 'flex', flexDirection: 'column' }}>
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

                    <div>
                        <FormControl>
                            <RadioGroup name="use-radio-group" defaultValue="alle">
                                <FormControlLabel value="alle" label="Alle" control={<Radio onChange={handleFilterChange} size="small" />} />
                                <FormControlLabel value="deine" label="Deine" control={<Radio onChange={handleFilterChange} size="small" />} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
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
                        indexStart > 0 ?
                            <ArrowLeftIcon fontSize="large" onClick={handleSlideLClick} />
                            : null
                    }
                    {
                        indexEnd < postsArray.length ?
                            <ArrowRightIcon fontSize="large" onClick={handleSlideRClick} />
                            : null
                    }
                </div>
            </Box>
        </Container>
    )
}


export default Feed;
