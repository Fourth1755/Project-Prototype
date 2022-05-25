
import React, { useState, useEffect } from "react";
import animeData from '../../data/db.json'
import ItemAnime from "../../component/ItemAnime/index";
import {
    Container,
    Box
} from '@mui/material'
const AnimeAllPage = () => {
    return (
        <Container
            sx={{
                paddingTop:10
            }}>
            <h1>All Anime</h1>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 4,
                        width: 280,
                        height: 420,
                    },
                }}
            >
                {animeData.map(anime =>
                    <ItemAnime key={anime.id} anime={anime} />)}
            </Box>

        </Container>
    );
}
export default AnimeAllPage;