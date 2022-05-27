import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addToList } from "actions/animeListAction";
import { useNavigate } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import AnimeDetailModal from "component/AnimeDetailModal";
import {
    Typography,
    Stack,
    Button,
    CardContent,
    CardMedia,
    Card
} from '@mui/material'
const ItemAnime = ({ anime }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [isDetailVisible, setIsDetailVisible] = useState(false)
    const [activeData, setActiveData] = useState('')
    function handleAddToList() {
        //if(!user){
        //navigate('/signin')
        //}else{
        dispatch(addToList({ ...anime, quantity: 1 }))
        //}
    }
    const handleDetail = (anime) => {
        setIsDetailVisible(true)
        setActiveData(anime)
    }
    return (
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
                        fontSize: 16
                    }}>
                    {anime.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {anime.year}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        onClick={() => handleDetail(anime)}>Detail</Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor:'#FF1493'
                        }}
                        startIcon={<SaveIcon />}
                        onClick={handleAddToList}>Add</Button>
                </Stack>
            </CardContent>
            <AnimeDetailModal
                visible={isDetailVisible}
                data={activeData}
                onClose={() => {
                    setIsDetailVisible(false)
                    //setActiveData(undefined)
                }}
            />
        </Card>
    );
}
export default ItemAnime