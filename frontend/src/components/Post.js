import { v4 as uuidv4 } from 'uuid';

import { useRef, useState, useEffect } from 'react'
import * as React from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import { TextField, Button } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import ParkIcon from '@mui/icons-material/Park';


// npm install @mui/material
// npm install @emotion/react
// npm install @emotion/styled
// npm install @mui/icons-material


const Post = () => {

    const commentRef = useRef()
    const likeCount = useRef(0)

    const [expanded, setExpanded] = React.useState(false);
    const [commentInput, setCommentInput] = React.useState(false);
    const [likeValue, setLikeValue] = useState("");

      
    const posts = [{
        id: uuidv4(),
        userId: uuidv4(),
        date: "05. November 2022",
        title: "Wäschetrocknen in der Sonne",
        text: "Heute war wieder ein perfekter Tag, um die Wäsche draußen zu trocknen.",
        link: "",
        picture: "??",
        alttext: "Bildbeschreibung...",
        comments: [
            {
                userId: "usernummereins",
                date: "datum",
                text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            },
            {
                userId: "usernummerdreis",
                date: "datum",
                text: "tua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            }
        ]
    },
    {
        id: uuidv4(),
        userId: uuidv4(),
        date: "",
        title: "Smartphone ausschalten",
        text: "Hey, ich habe es heute geschafft, mein Smartphone für 3 Stunden ausgeschaltet zu lassen! :-)",
        link: "",
        picture: "??",
        alttext: "Bildbeschreibung...",
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

    const addComment = (String) => {
        // return ()
    }

    const newComment = () => {
        if
            ((commentRef.current.value !== "") !== "") {
            addComment(commentRef.current.value)
        }
        commentRef.current.value = "";
        newCommentInput();
    }

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginRight: 0,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const newCommentInput = () => {
        setCommentInput(!commentInput);
    }

    const handleSendClick = () => {
        newComment();
    }

    // useEffect(() => {
    //     likeCount.current = likeCount.current + 1;
    //   }, likeValue);

    const newLikeClick = () => {
        setLikeValue(!likeValue)
        likeCount.current = likeCount.current + 1; 
    }

    console.log("LikeCounter:  ",likeCount.current )

    // const theme2 = createTheme({
    //     components: {
    //         CardContent: {
    //             disableTypography: false,
    //             fontSize: '3rem'
    //         }
    //     }
    // })

    // const theme = createTheme({
    //     components: {
    //         // Name of the component
    //         MuiButton: {
    //             styleOverrides: {
    //                 // Name of the slot
    //                 root: {
    //                     // Some CSS
    //                     fontSize: '1rem',
    //                 },
    //             },
    //         },
    //         CardHeader: {
    //             styleOverrides: {
    //                 disableTypography: false,
    //                 titleTypographyProps: {
    //                     fontSize: '5.0rem',
    //                     color: 'red'
    //                 },
    //                 subheader: {
    //                     color: 'blue'
    //                 }
    //             }
    //         },
    //         Card: {
    //             margin: '2rem'
    //         }
    //     }
    // });

    return (
        // <ThemeProvider theme={theme2}>
        <Card sx={{ maxWidth: 380, margin: 5, fontSize: 16 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: '#4c7257' }}
                        aria-label="recipe">
                        R
                    </Avatar>
                }
                title="userName1"
                subheader="September 14, 2016"          // posts.date
            />
            <CardHeader titleTypographyProps={
                { variant: 'subtitle1', fontWeight: 'bold' }}
                title={posts[0].title}   // posts.title
            />
            <CardMedia
                component="img"
                height="194"
                image={require('../images/postcards/laundry-3390806.jpg')}
                alt={posts[0].alttext}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {posts[0].text}
                </Typography>
            </CardContent>
            <CardContent>
                <ParkIcon />
                test
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> */}
                <ParkIcon
                    // ref={likeCount}
                    onClick={newLikeClick} 
                    sx={{ color: 'green' }} />

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <CommentIcon onClick={newCommentInput} />

                <p style={{ margin: '0 0 0 auto' }} >Kommentare</p>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            {
                commentInput === true ?
                    <CardContent >
                        <TextField
                            ref={commentRef}
                            multiline={true}
                            fullWidth
                            size="small"
                            label="Dein Kommentar"
                            rows={5} />
                        <Button
                            variant="text"
                            onClick={handleSendClick} >
                            Senden
                        </Button>
                    </CardContent>

                    : null
            }
            {
                posts[0].comments.map(e => (

                    <Collapse in={expanded} timeout="auto" unmountOnExit
                        style={{ fontSize: '0.75rem' }} >
                        <CardHeader
                            titleTypographyProps={
                                { fontSize: '1.15em', fontWeight: 'bold' }}
                            subheaderTypographyProps={
                                { fontSize: '1.1em' }}
                            title={e.userId}
                            subheader={e.date}
                        />
                        <CardContent >
                            <Typography fontSize="1.2em" color="text.secondary">
                                {e.text}
                            </Typography>
                        </CardContent>
                    </Collapse>
                ))
            }
        </Card>
        // </ThemeProvider>
    )
}



export default Post;
