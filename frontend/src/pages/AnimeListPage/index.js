import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { delteList, addToList, reduceList } from "../../actions/animeListAction"
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Typography,
    Table,
    TableRow,
    Stack,
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    Modal,
    MenuItem
} from '@mui/material'
const AnimeListPage = () => {
    const animeList = useSelector(state => state.animeList)
    const dispatch = useDispatch()
    return (
        <Container
            sx={{
                paddingTop:10
            }}>
            <h1>My Anime List</h1>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>#</TableCell>
                            <TableCell align='center'>Anime</TableCell>
                            <TableCell align='center'>Year</TableCell>
                            <TableCell align='center'>Number</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    {animeList.length === 0 ?
                        <TableCell colSpan={6} align='center'>
                            <Typography>No Results</Typography>
                        </TableCell> : <TableBody>
                            {animeList.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row" align='center'>
                                        {item.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        {item.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        {item.year}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        <button type="button" className="btn btn" onClick={() => dispatch(reduceList({ ...item, quantity: 1 }))}>-</button>
                                        {item.quantity}
                                        <button type="button" className="btn btn" onClick={() => dispatch(addToList({ ...item, quantity: 1 }))}>+</button>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        <button type="button" className="btn btn-danger" onClick={() => dispatch(delteList(item.id))}>Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </Container>
    )
}
export default AnimeListPage;