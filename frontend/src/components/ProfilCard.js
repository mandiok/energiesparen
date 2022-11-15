import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ParkIcon from '@mui/icons-material/Park';
import { Box, Typography } from '@mui/material';

//----------------------------------------------------------


const ProfilCard = () => {

    const first_name = 'Alex'
    const userName = "Albo"

    const posts = [{
        userId: '111',
        comments: ['111', '777', '444']
    }, {
        userId: '222',
        comments: ['111', '222', '444']
    },
    {
        userId: '333',
        comments: ['111', '555', '444']
    }, {
        userId: '444',
        comments: ['111', '222', '444']
    }
    ]

    const inputField = [{
        user_name: 'Alex',
        id: '111'
    }, {
        user_name: 'Hans',
        id: '222'
    }, {
        user_name: 'Rita',
        id: '333'
    }, {
        user_name: 'Felix',
        id: '444'
    },
    {
        user_name: 'Felix',
        id: '555'
    }
    ]

    let yourPosts = 0;
    let yourLikes = 0;
    posts.map(e => {
        if (e.userId === '111')
        // if (e.userId === inputField.id) 
        {
            yourPosts = yourPosts + 1;
            yourLikes = yourLikes + e.comments.length;
        }
    })

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
                        {first_name.substr(0, 1).toUpperCase()}
                    </Avatar>
                }
            />
            <CardHeader titleTypographyProps={{
                variant: 'subtitle1',
                fontWeight: 'bold'
            }}
                title={userName}
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
                    yourPosts === 1 ?
                        <p>{yourPosts} Post</p>
                        : ((yourPosts > 1) || (yourPosts === 0)) ?
                            <p>{yourPosts} Posts </p>
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
                {yourLikes}
                <ParkIcon sx={{ marginLeft: 0.5, color: '#195907' }} />
            </Box>
            <Box sx={{ mb: 1 }} >
                erhalten
            </Box>
        </Card>
    )
}

export default
    ProfilCard;