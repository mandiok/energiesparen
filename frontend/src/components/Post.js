import DateToday from './DateToday';
import LikeMarker from './LikeMarker';
import { AppContext } from "../providers/AppContext";

import { v4 as uuidv4 } from 'uuid';

import { useRef, useState, useEffect } from 'react'
import * as React from 'react';

import { useContext } from 'react';
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

//-------------------------------------------------------------

const Post = ({ post }) => {

    // console.log("Post:", post.title)

    const { posts, setPosts, addLike, removeLike, addComment, userData } = useContext(AppContext)

    const date = DateToday();

    // useRefs:
    const commentRef = useRef()

    //useStates:
    const [expanded, setExpanded] = useState(false);
    const [treecolored, setTreecolored] = useState(false);
    const [commentInput, setCommentInput] = useState();
    const [shareItem, setShareItem] = useState(false);

    // Prüfen, ob der User für diesen Post bereits ein Like gesetzt hat. 
    let treeState = false;
    useEffect(() => {
        if ((post.id !== "undefined") && (post.likes.length > 0)) {
            treeState = (!post.likes.every(e => {
                return (e !== userData.id)
            }))
            if (treecolored !== treeState)
                setTreecolored(!treecolored)
        }
    }, [])


    // checkt, ob Kommentar eingegeben wurde und ruft die func() addComment auf
    const newComment = () => {
        if
            ((commentRef.current.value !== "") !== "") {
            const comment = {
                id: uuidv4(),
                userId: userData.id,
                date: date,
                text: commentRef.current.value,
            }
            addComment(post, comment)
        }
        commentRef.current.value = "";
        newCommentInput();
    }

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
        if ((treecolored === false) && (post.likes.find(e => e === userData.id) === undefined)) {
            addLike(post, userData.id)
            setTreecolored(!treecolored)
        } else if (treecolored === true) {
            console.log("treecolored von ", post.title, " ist ", treecolored)
            setTreecolored(!treecolored)
            removeLike(post, userData.id)
        }
    }

    //----- MUI ----------------------------------
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
        color: treecolored ? '#195907' : 'grey',
    }));



    // ............... RETURN .......................................
    return (
        post ?
            <Card sx={{
                margin: 1,
                fontSize: 16,
                width: "100%"
            }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: '#195907' }}
                            aria-label="recipe">
                            {userData.user_name.substr(0, 1).toUpperCase()}
                        </Avatar>
                    }
                    title={post.userName}
                    subheader={post.date}
                />
                <CardHeader titleTypographyProps={{
                    variant: 'subtitle1',
                    fontWeight: 'bold'
                }}
                    title={post.title}   // posts.title
                />
                {
                    post.picture ? 
                <CardMedia
                    component="img"
                    height="194"
                image={post.picture}
                />
                : null
            }
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary">
                        {post.text}
                    </Typography>
                </CardContent>
                <CardContent sx={{
                    margin: 0,
                    padding: 0.25,
                    fontWeight: 'bold'
                }}>
                    <LikeMarker />
                    <Box
                        sx={{
                            display: 'inline',
                            marginLeft: 0.5
                        }}>
                        {post.likes.length}
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
                    {
                        post.comments.length === 1 ?
                            <p style={{ margin: '0 0 0 auto' }} >{post.comments.length} Kommentar</p>
                            :
                            post.comments.length > 1 ?
                                <p style={{ margin: '0 0 0 auto' }} >{post.comments.length} Kommentare</p>
                                :
                                post.comments.length === 0 ?
                                    <p style={{ margin: '0 0 0 auto' }} ></p>
                                    : null}
                    {
                        post.comments.length > 0 ?
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more">
                                <ExpandMoreIcon />
                            </ExpandMore>
                            : null
                    }
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
                    post.comments.map(e => (
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
            : null
    )
}



export default Post;
