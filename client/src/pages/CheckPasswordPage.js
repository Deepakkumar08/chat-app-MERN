import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";    
import { FaRegUserCircle } from "react-icons/fa";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";



const CheckPasswordPage = ()=>{
    const [data, setData] =useState({
        password:""
   })
   useEffect(()=>{
    if(!location?.state?.name){
        navigate('/email')
    }
   },[])
    const navigate =useNavigate()
    const location =useLocation()
    const dispatch = useDispatch()
    console.log(location,'locationnn')
    
    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setData((prev=>{
            return {
                ...prev, [name]:value
            }
        }))
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        const URL = '/api/password'
        try {
            const res = await axios.post('/api/password', {

                userId : location?.state?._id,
                password : data.password
            })
            toast.success(res.data.message)
        
            console.log(res,'ress');


            if(res.data.success){
                dispatch(setToken(res?.data?.token))
                localStorage.setItem('token',res?.data?.token)
                setData({
                    password:"",
                })
                navigate('/')
            }
        } catch (error) {

            toast.error(error?.response?.data?.message )
            console.log(error,'errrorrrr');
        }
    }
    console.log(data,'dattttaa');
    return (
        <div className="bg-white w-full max-w-sm  rounded overflow-hidden p-4 mx-auto my-7">
         <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
        <div className="w-fit mx-auto mb-2">
            <Avatar
              width={70} height={70}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
             ></Avatar>
             <h2 className="my-5 font-bold text-xl">{location?.state?.name}</h2>
            </div>
         <div className="flex flex-col gap-2">
             <label htmlFor="password">Password :   </label>
             <input 
                 type="password"
                 id = 'password' 
                 name="password" 
                 placeholder="enter your password"     
                 className="bg-slate-100 px-2 py-2 focus:outline-purple-400"   
                 value={data.password}
                 onChange={handleOnChange}
                 required
             >
             </input>
         </div>
        
         <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 text-white leading-relaxed tracking-tighter"> Login</button>
        </form>
        <p className="my-4 text-center">
           <Link to={"/forgotpassword"} className='hover:text-primary font-semibold'> Forgot password ?</Link>
           </p>

     </div>
    )
}

export default CheckPasswordPage