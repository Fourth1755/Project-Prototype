import React, { useState, useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {delteList,addToList,reduceList} from "../../actions/animeListAction"
const AnimeListPage = () => {
    const animeList=useSelector(state=>state.animeList)
    const dispatch=useDispatch()
    return (
        <div className="container">
            <h1>Anime List Page</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Anime</th>
                        <th scope="col">Year</th>
                        <th scope="col">Number</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {animeList.length===0?
                    <tr>
                        <td></td>
                        <td></td>
                        <td>List is empty</td>
                        <td></td>
                        <td></td>
                    </tr>:animeList.map(item=>
                    <tr cope="row" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.year}</td>
                        <td>
                            <button type="button" className="btn btn" onClick={()=>dispatch(reduceList({...item,quantity:1}))}>-</button>
                                {item.quantity}
                            <button type="button" className="btn btn" onClick={()=>dispatch(addToList({...item,quantity:1}))}>+</button>
                        </td>
                        <td><button type="button" className="btn btn-danger" onClick={()=>dispatch(delteList(item.id))}>Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default AnimeListPage;