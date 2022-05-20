
import React, { useState, useEffect } from "react";
import animeData from '../../data/db.json'
import ItemAnime from "../../component/ItemAnime";
const AnimeAllPage=()=>{
    return(
        <div className="container">
            <h1>All Anime</h1>
            <div className="row">
                {animeData.map(anime=>
                    <ItemAnime key={anime.id} anime={anime}/>)}
            </div>
            
        </div>
    );
}
export default AnimeAllPage;