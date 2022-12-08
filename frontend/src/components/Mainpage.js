import Feed from "./Feed";
import InputPost from "./InputPost";
import ProfilCard from "./ProfilCard"
import MenuAppBar from "./HeaderLoggedIn";
import Card from '@mui/material/Card';
import { Box } from "@mui/system";
import Container from "@mui/system/Container";
import { AppContext } from "../providers/AppContext";
import { useContext } from "react";

//---------------------------------------------------


const Mainpage = () => {

    const { posts, userData } = useContext(AppContext);
    console.log("userdata",userData)

    if (posts) {
        return (
            <div>
                <MenuAppBar />
                <Container sx={{
                    display: "flex",
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignContent: 'flex-start'
                }} >
                    <Box sx={{ width: '20%' }} >
                        <ProfilCard />
                    </Box>
                    <Box sx={{ width: '45%', margin: 1 }} >
                        <InputPost />
                        <Feed />
                    </Box>
                    <Card sx={{ bgcolor: '#dfe8ec', paddingLeft: 1, width: '20%' }} >
                        <p>weitere Funktionen
                        </p>
                    </Card>
                </Container>
            </div >
        )
    }
}

export default Mainpage;