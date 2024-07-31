import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from 'axios';
import toast from "react-hot-toast";

const RegisterPage = ()=>{
    const [data, setData] =useState({
        name:"",
        email:"",
        password:"",
        profile_pic:""
    })
    const navigate =useNavigate()
    const [uploadPhoto, setUploadPhoto] = useState('')
    const handlePic =async(e)=>{
        const file = e.target.files[0]
        const upload = await uploadFile(file)
        console.log(upload,'upload....')
        setUploadPhoto(file)
        setData ((prev =>{
            return {
                ...prev,  profile_pic:upload?.url
            }
        }))
    }
    console.log(uploadPhoto,'upppppp');
    const removePic = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        setUploadPhoto(null)
    }
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
        console.log(data,process.env,'dattttaa');
        const URL = `${process.env.REACT_APP_BACKEND_URL}/`
        //const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

        try {
            const res = await axios.post('/api/register',data)
            toast.success(res.data.message)
            console.log(res,'ress');


            if(res.data.success){
                setData({
                    name:"",
                    email:"",
                    password:"",
                    profile_pic:""
                })
                navigate('/email')
            }
        } catch (error) {

            toast.error(error?.response?.data?.message )
            console.log(error,'errrorrrr');
        }
    }
    console.log(data,'dattttaa');

    return (
        <div className="bg-white w-full max-w-sm  rounded overflow-hidden p-4 mx-auto my-7">
           <h3>Welcome to Deep Chat!</h3>
           <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Name :   </label>
                <input 
                    type="text"
                    id = 'name' 
                    name="name" 
                    placeholder="enter your  name"     
                    className="bg-slate-100 px-2 py-2 focus:outline-primary"   
                    value={data.name}
                    onChange={handleOnChange}
                    required
                >
                </input>
            </div>
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
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Password :   </label>
                <input 
                    type="password"
                    id = 'password' 
                    name="password" 
                    placeholder="enter your password"     
                    className="bg-slate-100 px-2 py-2 focus:outline-primary"   
                    value={data.password}
                    onChange={handleOnChange}
                    required
                >
                </input>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="profile_pic">Profile Pic :   
                    <div className="h-14 bg-slate-100 flex justify-center items-center border rounded hover:border-purple-700">
                        <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">{
                            uploadPhoto && uploadPhoto.name ? uploadPhoto.name : "Upload profile picture"
                            }  </p>
                            {
                               uploadPhoto && uploadPhoto.name && (
                                        <button className="text-lg ml-2 hover:text-red-600 "  onClick={removePic}> 
                                <IoClose></IoClose>
                            </button>
                                )
                            }
                            
                    </div>
                </label>
                <input 
                    type="file"
                    id = 'profile_pic' 
                    name="profile_pic" 
                    onChange={handlePic} 
                    className="bg-slate-100 px-2 py-2 focus:outline-primary hidden"   
    
                >
                </input>
            </div>
            <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 text-white leading-relaxed tracking-tighter"> REGSITER</button>
           </form>
           <p className="my-4 text-center"> Already having account ?
              <Link to={"/email"} className='hover:text-primary font-semibold'> Login </Link>
              </p>

        </div>
    )
}

export default RegisterPage