import {Routes,Route } from "react-router-dom";
import bootstrap from 'bootstrap'
import Navbar from "./component/Navbar/index";
import HomePage from "./pages/HomePage/index"
import AnimeListPage from "./pages/AnimeListPage/index";
import AnimeAllPage from "./pages/AnimeAllPage/index"
import LoginPage from "pages/LoginPage";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const UnAuthApp=()=>{
    return(
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/anime" element={<AnimeAllPage/>}/>
        </Routes>
    )
  }
  const AuthApp=()=>{
    return(
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/animelist" element={<AnimeListPage/>}/>
          <Route path="/anime" element={<AnimeAllPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>

  )
  }
  const {user} =useSelector((state)=>state.auth)
  return (
    <div>
      <Navbar/>
      {!user?<UnAuthApp/>:<AuthApp/>}
    </div>
  );
}

export default App;
