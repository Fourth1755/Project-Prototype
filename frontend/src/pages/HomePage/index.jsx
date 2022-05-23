import HighchartsAnime from "../../component/Highcharts";
import animeData from '../../data/db.json'
const HomePage =()=>{
    return(
        <div className="continer">
            <h1>Home Page</h1>
            <HighchartsAnime
                data={animeData}
            />
        </div>
    )
}
export default HomePage;