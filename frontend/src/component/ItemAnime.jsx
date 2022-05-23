import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { addToList } from "../actions/animeListAction";
import { useNavigate } from "react-router-dom";
const ItemAnime =({anime})=>{
    const dispatch=useDispatch()
    const {user} =useSelector(state=>state.auth)
    const navigate = useNavigate();
    function handleAddToList(){
        //if(!user){
            //navigate('/signin')
        //}else{
            dispatch(addToList({...anime,quantity:1}))
        //}
    }
    return(
        <div className="card" style={{width: '14rem',margin: '20px'}}>
            <img className="card-img-top" src={anime.image} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{anime.name}</h5>
                <p className="card-text">{anime.year}</p>
                <button onClick={handleAddToList} className="btn btn-primary">Add to list</button>
            </div>
        </div>
    );
}
export default ItemAnime