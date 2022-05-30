import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthAsync } from '../../actions/authAction'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import {
    Stack,
    Button,
    Container,
    TextField,
    Box,
    Grid,
    Paper,
    CardMedia,
    Typography
} from '@mui/material'
import { styled } from '@mui/material/styles';
import './index.scss'
const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.status)

    const [messagesErrorEmail, setMessagesErrorEmail] = useState('');
    const [isErrorEmail, setIsErrorEmail] = useState(false);

    const [messagesErrorPassword, setMessagesErrorPassword] = useState('');
    const [isErrorPassword, setIsErrorPassword] = useState(false);


    const submitLogin = async () => {
        if (email.length === 0) {
            setIsErrorEmail(true)
            setMessagesErrorEmail("Please fill Email")
        } else if (password.length === 0) {
            setIsErrorPassword(true)
            setMessagesErrorPassword("Please fill Password")
            
        } else {
            try {
                Swal.showLoading()
                await dispatch(fetchAuthAsync(email, password))
                Swal.close()
                
            } catch (error) {
                Swal.fire('Error', error, 'error')
            }
        }


    }
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 840 }}
        ><Paper className="paper-login">
                <Grid container>
                    <Grid item xs={8}>
                        <CardMedia
                            component="img"
                            width='100%'
                            height='100%'
                            image="https://images3.alphacoders.com/235/thumb-1920-235569.jpg"
                            alt="green iguana"
                            className="image-login"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={0} className="paper-login-login">
                            <Stack spacing={3}>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontWeight: 700,
                                        color: '#FF1493',
                                        textDecoration: 'none',
                                        textAlign: 'center'
                                    }}
                                >
                                    Wellcome to Anime Map
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    label="Email address"
                                    variant="outlined"
                                    name='email'
                                    value={email}
                                    type="email"
                                    onChange={e => setEmail(e.target.value)}
                                    helperText={messagesErrorEmail}
                                    error={isErrorEmail} />
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    name='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    helperText={messagesErrorPassword}
                                    error={isErrorPassword} />
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="button-login"
                                    onClick={submitLogin}>{loading ? "Loading" : "Submit"}</Button>
                                {error && <p style={{ color: 'red', fontSize: '12' }}>{error}</p>}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
export default LoginPage;