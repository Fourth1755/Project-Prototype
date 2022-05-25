import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { addToList } from "../../actions/animeListAction";
import { useNavigate } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
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
    CardActions,
    CardContent,
    CardMedia,
    Card
} from '@mui/material'
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
    const handleDetail =(anime)=>{
        
    }
    return(
        <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                    component="img"
                    height="260"
                    image={anime.image}
                    alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        textDecoration: 'none',
                        fontSize:16
                    }}>
                    {anime.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {anime.year}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button 
                        size="small"
                        href="#text-buttons"
                        onClick={()=>handleDetail(anime)}>Detail</Button>
                    <Button 
                        variant="contained"
                        size="small"
                        startIcon={<SaveIcon/>}
                        onClick={handleAddToList}>Add</Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
export default ItemAnime