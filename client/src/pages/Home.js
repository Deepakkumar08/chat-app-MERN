import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
    
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
           if(res.data.logout){
                dispatch(logout())
                navigate('/email')
           }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchUserData()
    },[])
    return (
        <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
            <section className="bg-white rounded-tr" >
                <Sidebar></Sidebar>
            </section>
            <section>
                <Outlet></Outlet>
            </section>
        </div>
    )
}

export default Home