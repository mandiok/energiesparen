import DateToday from './DateToday';
import LikeMarker from './LikeMarker';

import { v4 as uuidv4 } from 'uuid';

import { useRef, useState } from 'react'
import * as React from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import { TextField, Button } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { grey } from '@mui/material/colors';


// npm install @mui/material
// npm install @emotion/react
// npm install @emotion/styled
// npm install @mui/icons-material

const LOCAL_STORAGE_KEY = "local_storage_post";

const Post = ({ index, userName, userId, first_name }) => {

    userId = "4626-457484-24526";

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
        date: "",
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

    index = 0;          // wird später an Post(index) beim Aufruf übergeben
    userName = "user__?"
    first_name = "Max"
    const commentRef = useRef()

    const [posts, setPosts] = useState(postArray);
    const [expanded, setExpanded] = useState(false);
    const [treecolored, setTreecolored] = useState(false);
    const [commentInput, setCommentInput] = useState(false);
    const [shareItem, setShareItem] = useState(false);


    // Speichere Posts im local_storage
    const savePostsToLocalStorage = posts => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    }

    const date = DateToday();

    // fügt einen neuen, eingegebenen Kommentar zum aktuellen Post hinzu
    const addComment = text => {
        const p = [...posts];
        const comment = {
            id: uuidv4(),
            userId: userId,
            date: date,
            text: text,
        }
        p[index].comments.push(comment)
        setPosts(p);
        savePostsToLocalStorage(posts)
    }

    // checkt, ob Kommentar eingegeben wurde und ruft die func() addComment auf
    const newComment = () => {
        if
            ((commentRef.current.value !== "") !== "") {
            addComment(commentRef.current.value)
        }
        commentRef.current.value = "";
        newCommentInput();
    }

    // MUI Funktion: mit einem Klick auf "ExpandMore" werden Kommentare eingeblendet
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

    const ParkIconC = styled(ParkIcon)(({ theme }) => ({
        marginRight: 0,
        color: treecolored ? 'green' : 'grey',
        "&:hover": {
            bgcolor: grey
        }
    }));


    // Ändert den Status des expanded-States
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Ändert den Status des commentInput-States
    const newCommentInput = () => {
        setCommentInput(!commentInput);
    }

    const handleShareClick = () => {
        console.log(":", shareItem)
        setShareItem(!shareItem);
    }

    // Beim Klick auf den SendButton wird neuer Kommentar aufgenommen
    const handleSendClick = () => {
        newComment();
    }

    // beim Klick auf den Baum wird ein Like vergeben oder wieder rausgenommen
    const newLikeClick = () => {
        if ((treecolored === false) && (posts[index].likes.find(e => e === userId) === undefined)) {
            setPosts(...[posts], posts[index].likes.push(userId));
        } else if (treecolored === true) {
            const p = [...posts]
            const userIdIndex = posts[index].likes.findIndex(e => e === userId)
            p[index].likes.splice(userIdIndex, 1)
            setPosts(p)
        }
        setTreecolored(!treecolored)
    }


    // ............... RETURN .......................................
    return (
        <Card sx={{ maxWidth: 380, margin: 5, fontSize: 16 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: '#4c7257' }}
                        aria-label="recipe">
                        {first_name.substr(1, 1).toUpperCase()}
                    </Avatar>
                }
                title={userName}
                subheader={posts[index].date}
            />
            <CardHeader titleTypographyProps={{
                variant: 'subtitle1',
                fontWeight: 'bold'
            }}
                title={posts[index].title}   // posts.title
            />
            <CardMedia
                component="img"
                height="194"
                image={require('../images/postcards/laundry-3390806.jpg')}
                alt={posts[index].alttext}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary">
                    {posts[index].text}
                </Typography>
            </CardContent>
            <CardContent sx={{ margin: 0, padding: 0, fontWeight: 'bold' }}>
                <LikeMarker />
                <Box
                    sx={{ display: 'inline', marginLeft: 0.5 }}>
                    {posts[index].likes.length}
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <ParkIconC onClick={newLikeClick} />
                <IconButton
                    onClick={handleShareClick}
                    aria-label="share">
                    <ShareIcon />
                </IconButton>
                <CommentIcon onClick={newCommentInput} />
                <p style={{ margin: '0 0 0 auto' }} >Kommentare</p>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            {
                shareItem ?
                    <CardContent sx={{ margin: 0 }}>
                        <FacebookIcon sx={{ marginRight: 1.5 }} />
                        <TwitterIcon sx={{ marginRight: 1.5 }} />
                        <InstagramIcon sx={{ marginRight: 1.5 }} />
                        <ContentCopyIcon />
                    </CardContent>
                    : null
            }
            {
                commentInput === true ?
                    <CardContent >
                        <TextField
                            inputRef={commentRef}
                            multiline={true}
                            fullWidth
                            size="small"
                            label="Dein Kommentar"
                            rows={3} />
                        <Button
                            variant="text"
                            onClick={handleSendClick} >
                            Senden
                        </Button>
                    </CardContent>
                    : null
            }
            {
                posts[index].comments.map(e => (
                    <Collapse key={e.id} in={expanded} timeout="auto" unmountOnExit
                        style={{ fontSize: '0.75rem' }} >
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: '1.15em',
                                fontWeight: 'bold'
                            }}
                            subheaderTypographyProps={{
                                fontSize: '1.1em'
                            }}
                            title={e.userId}
                            subheader={e.date}
                        />
                        <CardContent >
                            <Typography
                                fontSize="1.2em"
                                color="text.secondary">
                                {e.text}
                            </Typography>
                        </CardContent>
                    </Collapse>
                ))
            }
        </Card>
    )
}



export default Post;
