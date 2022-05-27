import React, { useState, useEffect } from "react";
import {
    Container,
} from '@mui/material'
const AnimeDetailPage = (props) => {
    const {data} =props
    return (
        <Container
            sx={{
                paddingTop: 10
            }}>
            <h1>{data.name}</h1>
            
        </Container>
    );
}
export default AnimeDetailPage;