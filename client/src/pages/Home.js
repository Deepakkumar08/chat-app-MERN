import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import chatapplogo from '../assests/chatapplogo.jpg';
    
const Home = ()=>{
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const location = useLocation()
    console.log("redux user", user);
    const fetchUserData = async()=>{
        try {
           const res = await axios('/api/user-Details',{withCredentials:true}) 
           console.log(res,'current user');
           dispatch(setUser(res?.data?.data[0]))
           if(res.data.data.logout){
                dispatch(logout())
                navigate('/email')
           }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchUserData()
    },[])
    const basePath =location.pathname==='/'
    return (
        <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
            <section className={`bg-white rounded-tr ${!basePath && 'hidden'} lg:block`} >
                <Sidebar></Sidebar>
            </section>
            <section className={`${basePath && 'hidden'}`}>
                <Outlet></Outlet> 
            </section>
            <div className="lg:flex justify-center items-center flex-col gap-2 hidden">
                <div>
                    <img
                        src={chatapplogo} width={200} alt="logo">
                    </img>
                </div>
                <p className="text-lg mt-2 text-slate-500">Please select user to send message</p>
            </div>
        </div>
    )
}

export default Home