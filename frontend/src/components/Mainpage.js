import Feed from "./Feed";
import InputPost from "./InputPost";
import ProfilCard from "./ProfilCard"
import MenuAppBar from "./HeaderLoggedIn";

import { Box } from "@mui/system";
import Container from "@mui/system/Container";

//---------------------------------------------------


const Mainpage = () => {


    return (
        <div>
            <MenuAppBar />
            <Container sx={{
                display: "flex",
                justifyContent: 'center',
                flexDirection: 'row',
                alignContent: 'flex-start'
            }} >
                <Box sx={{ width: '30%' }} >
                    <ProfilCard />
                </Box>
                <Box>
                    <InputPost />
                    <Feed />
                </Box>
                <Box sx={{ bgcolor: '#f8f5f5', width: '25%' }} >
                    <p>weitere Funktionen
                    </p>
                </Box>
            </Container>
        </div >
    )
}

export default Mainpage;