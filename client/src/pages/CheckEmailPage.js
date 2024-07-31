import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";    
import { FaRegUserCircle } from "react-icons/fa";



const CheckEmailPage = ()=>{
    const [data, setData] =useState({
        email:""
   })
    const navigate =useNavigate()
    
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
        try {
            const res = await axios.post('/api/email',data)
            toast.success(res.data.message)
            console.log(res,'ress');


            if(res.data.success){
                setData({
                    email:"",
                })
                navigate('/password',{
                    state : res?.data?.data
                })
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
        <div><FaRegUserCircle size={60} className="w-fit mx-auto mb-2"></FaRegUserCircle></div>
         <div className="flex flex-col gap-2">
             <label htmlFor="email">Email :   </label>
             <input 
                 type="email"
                 id = 'email' 
                 name="email" 
                 placeholder="enter your email"     
                 className="bg-slate-100 px-2 py-2 focus:outline-purple-400"   
                 value={data.email}
                 onChange={handleOnChange}
                 required
             >
             </input>
         </div>
        
         <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 text-white leading-relaxed tracking-tighter"> Let's Chat</button>
        </form>
        <p className="my-4 text-center"> New User ?
           <Link to={"/register"} className='hover:text-primary font-semibold'> Register </Link>
           </p>

     </div>
    )
}

export default CheckEmailPage