import {Routes,Route } from "react-router-dom";
import bootstrap from 'bootstrap'
import Navbar from "./component/Navbar/index";
import HomePage from "./pages/HomePage/index"
import AnimeListPage from "./pages/AnimeListPage/index";
import AnimeAllPage from "./pages/AnimeAllPage/index"
function App() {
  const UnAuthApp=()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/animelist" element={<AnimeListPage/>}/>
            <Route path="/anime" element={<AnimeAllPage/>}/>
        </Routes>
    )
  }
  const AuthApp=()=>{
    return(
      <Routes>
          <Route path="/" exact component={<HomePage/>}/>
      </Routes>
  )
  }
  return (
    <div>
      <Navbar/>
      <UnAuthApp/>
    </div>
  );
}

export default App;
