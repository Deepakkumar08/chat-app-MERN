import React, { useEffect, useState, useRef } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const EditUserInfo = ({onClose,user}) => {
    const dispatch =useDispatch()
    const [data, setData]=useState({
        //_id :
        name : user?.user,
        profile_pic : user?.profile_pic
    })
    const uploadref  = useRef()
    useEffect(() => {
        setData((pre)=>{
            return{
                ...pre,
                ...user

            }
        })
    }, [])
    const handleOnChange = (e) =>{
        const {name,value} = e.target
        setData((pre)=>{
           
            return {
                ...pre,
                [name] : value
            }
        })
    }
    const handleUploadPic = async(e)=>{
        uploadref.current.click()
    }
    const handlePic =async(e)=>{
        const file = e.target.files[0]
        const upload = await uploadFile(file)
        setData ((prev =>{
            return {
                ...prev,  profile_pic:upload?.url
            }
        }))
    }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    e.stopPropagation()
    try {
        const res = await axios({
            method: 'post',
            url: '/api/update-user',
            data :  data,
            withCredentials : true
        })
        toast.success(res?.data?.message)
        if(res.data.message){
            dispatch(setUser(res.data.data))
            onClose()
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }  
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-600 bg-opacity-15 flex justify-center items-center' >
        <div className='bg-white p-4 m-1 rounded w-full max-w-sm'> 
            <h2 className='font-semibold'>Profile Details:</h2>
            <p className='text-sm'>Edit User Details :</p>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name'>
                                Name :
                        </label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={data?.name}
                            onChange={handleOnChange}
                            className='w-full py-1 px-2 focus:outline-purple-600 border-0.6'
                            >
                        
                        </input>
                    </div>
                    <div className='my-4'>
                        <label htmlFor='profile_pic'>Photo:
                        <div className='my-1 flex items-center gap-3'>
                            <Avatar
                                width={40}
                                height= {40}
                                imageUrl={data.profile_pic}
                                name={data?.name}
                                ></Avatar>
                        <button onClick={handleUploadPic} className='font-semibold'>Change Photo</button>     
                        <input 
                            type='file'
                            className='hidden'
                            id='profile_pic'
                            onChange={handlePic}
                            ref ={uploadref}
                        />  
                        </div>
                        </label>
                    </div>
                    <Divider/>
                    <div className='flex gap-4 w-fit ml-auto mt-5'>
                        <button onClick={onClose} className='border-primary border text-primary hover:bg-primary hover:text-white px-4 py-1 rounded'>Cancel</button>
                        <button onSubmit={handleSubmit} className='border-primary border bg-primary text-white  px-4 py-1 rounded'>Save</button>

                    </div>
                </form> 
        </div>
        </div>
  )
}

export default React.memo(EditUserInfo)