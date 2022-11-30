import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ParkIcon from '@mui/icons-material/Park';
import { Box, Typography } from '@mui/material';
import { AppContext } from "../providers/AppContext";
import { useContext, useState, useEffect } from 'react';

//----------------------------------------------------------


const ProfilCard = () => {

    const { userData, posts } = useContext(AppContext)
    
    const [userPosts, setUserPosts] = useState(0)
    const [userLikes, setUserLikes] = useState(0)

    const checkData = () => {
        let likes = 0;
        let postnumber = 0;
        posts.map(e => {
            if (e.userId === userData.id) {
                postnumber = postnumber + 1;
                likes = likes + e.likes.length;
            }
        })
        setUserPosts(postnumber)
        setUserLikes(likes)
    }


    useEffect(() => {
            checkData()
    }, [])


    if (posts)
        return (
            <Card sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{
                                bgcolor: '#195907',
                                padding: 0.5,
                                marginLeft: 1.5
                            }}
                            aria-label="recipe">
                            {userData.user_name.substring(0, 1).toUpperCase()}
                        </Avatar>
                    }
                />
                <CardHeader titleTypographyProps={{
                    variant: 'subtitle1',
                    fontWeight: 'bold'
                }}
                    title={userData.user_name}
                />
                <Box >
                    Du hast
                </Box>

                <Box sx={{
                    mb: 1,
                    mt: 1,
                    fontWeight: 'bold'
                }}>
                    {
                        userPosts === 1 ?
                            <p>{userPosts} Post</p>
                            : ((userPosts > 1) || (userPosts === 0)) ?
                                <p>{userPosts} Posts </p>
                                : null}

                </Box>
                <Box>
                    geschrieben
                </Box>
                <Box>und</Box>
                <Box sx={{
                    fontSize: '1.25em',
                    mt: 2,
                    mb: 2,
                    fontWeight: 'bold'
                }} >
                    {userLikes}
                    <ParkIcon sx={{ marginLeft: 0.5, color: '#195907' }} />
                </Box>
                <Box sx={{ mb: 2 }} >
                    erhalten
                </Box>
            </Card>
        )
}

export default ProfilCard;