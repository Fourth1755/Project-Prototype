import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchAuthAsync} from '../../actions/authAction'
const LoginPage=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const dispatch=useDispatch()
    const {loading,error} =useSelector(state=>state.status)
    return(
        <div className="container">
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" name='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" name='password' value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <button onClick={()=>dispatch(fetchAuthAsync(email,password))}>{loading ? "Loading": "Submit"}</button>    
                {error && <p style={{color:'red',fontSize:'12'}}>{error}</p>}
        </div>
    );
}
export default LoginPage;