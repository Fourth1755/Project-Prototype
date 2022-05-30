import {
    Container,
    Box
} from '@mui/material'
const StudioPage = () =>{
    
    return(
        <Container
        sx={{
            paddingTop:10
        }}>
        <h1>Studio</h1>
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
        </Box>
        </Container>
    )
}
export default StudioPage