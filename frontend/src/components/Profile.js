import MenuAppBar from './HeaderLoggedIn'
import { AppContext } from '../providers/AppContext';
//...................................................
import * as React from 'react';
import { useContext, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';

//---------------------------------------------------

const Profile = () => {

    const {userData, getProfileData, userProfile} = useContext(AppContext)

    console.log(userData.id)

    useEffect(() => {
        getProfileData(userData.id)
    }, [])

    console.log(userProfile)

    return (
        userProfile &&
        <div >
            <MenuAppBar />
            <Container sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }} >
                <Typography sx={{ fontSize: '2.0rem' }} color="text.primary" >
                    Profil
                </Typography>
                <Card sx={{
                    minWidth: 275,
                    width: '70%'
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
                                { userProfile.first_name.substr(0, 1).toUpperCase()}
                            </Avatar>
                        }
                    />
                    <CardContent >
                        <p>Nur für Dich sichtbar: </p>
                        <TextField sx={{ margin: 1, minWidth: 200 }}
                            id="outlined-disabled"
                            disabled
                            label='Vorname'
                            defaultValue={userProfile.first_name}
                        />
                        <TextField sx={{ margin: 1, minWidth: 230 }}
                            id="outlined-disabled"
                            disabled
                            label='Nachname'
                            defaultValue={userProfile.last_name}
                        />
                        <TextField sx={{ ml: 1, mt: 2, minWidth: 300 }}
                            id="outlined-disabled"
                            disabled
                            label='E-Mail Adresse'
                            defaultValue={userProfile.email}
                        />
                    </CardContent>
                    <CardContent>
                        <p>Für alle User sichtbar: </p>
                        <TextField sx={{ margin: 1, minWidth: 200 }}
                            id="outlined"
                            disabled
                            label='Username'
                            defaultValue={userProfile.user_name}
                        />
                    </CardContent>


                    <TextField sx={{ ml: 3, mb: 2, minWidth: 300 }}
                        id="outlined"
                        disabled
                        label='Website'
                        defaultValue={userProfile.website}
                    />
                    <TextField sx={{ ml: 3, mb: 2, minWidth: 300 }}
                        id="outlined"
                        disabled
                        label='Message'
                        defaultValue={userProfile.message}
                    />
                    <CardContent>
                    </CardContent>

                </Card>
            </Container>
        </div>
    )
}

export default Profile;

