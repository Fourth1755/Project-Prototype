import HighchartsAnime from "../../component/Highcharts";
import animeData from '../../data/db.json'
import {
    Container,
} from '@mui/material'
const HomePage =()=>{
    return(
        <Container>
            <h1>Home Page</h1>
            <HighchartsAnime
                data={animeData}
            />
        </Container>
    )
}
export default HomePage;