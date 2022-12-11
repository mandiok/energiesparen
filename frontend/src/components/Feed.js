import Post from "./Post";
import { AppContext } from "../providers/AppContext";
//..............................................
import { useState, useContext, useEffect } from "react";

import { Container, Box } from "@mui/material";
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
    const [postsArray, setPostsArray] = useState([]);

    const { posts, userData, sort, getIndexRClick, getIndexLClick } = useContext(AppContext)
///..................................

        // Anzahl Posts im Feed, die angezeigt werden. 
    // Um weitere zu sehen, gibt es unten Pfeile zum "Blättern"
    const steps = 2

    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(indexStart + steps);

//........................................

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setIndexStart(0);
        setIndexEnd(steps);
    }

    const handleChange = (event) => {
        setSelection(event.target.value);
        setIndexStart(0);
        setIndexEnd(steps);
    }

    const handleSlideLClick = () => {
        getIndexLClick(posts, filter, postsArray, steps, indexStart, setIndexStart, indexEnd, setIndexEnd);
    }

    const handleSlideRClick = () => {
        getIndexRClick(posts, filter, postsArray, steps, indexStart, setIndexStart, indexEnd, setIndexEnd)
    }

//........................................
    useEffect(() => {
        setPostsArray(sort(posts, userData, selection, filter))
    }, [])

    useEffect(() => {
        setPostsArray(sort(posts, userData, selection, filter))
    }, [selection, filter])

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
                <div style={{ dislpay: 'flex', flexDirection: 'row' }}>
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
                            <span style={{ color: '#6c87df', marginTop: '10px' }}>Zeige</span>
                            <RadioGroup name="use-radio-group" defaultValue="alle">
                                <FormControlLabel value="alle" label="Alle" control={<Radio onChange={handleFilterChange} size="small"
                                    sx={{ marginLeft: '15px' }} />} />
                                <span style={{ color: '#6c87df', marginTop: '1px' }}>oder nur</span>
                                <FormControlLabel value="deine" label="Deine" control={<Radio onChange={handleFilterChange} size="small"
                                    sx={{ marginLeft: '15px' }} />} />
                                <span style={{ color: '#6c87df', marginTop: '1px' }}> Beiträge</span>
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
                    // sort(selection).slice(indexStart, indexEnd).map(e => (
                    postsArray.slice(indexStart, indexEnd).map(e => (
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
