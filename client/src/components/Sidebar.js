import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import {NavLink} from  'react-router-dom';
import Avatar from "./Avatar"
import {useSelector} from 'react-redux'
import EditUserInfo from './EditUserInfo';
import Divider from './Divider';

const Sidebar = () => {
  const user = useSelector(state => state?.user)
  const [editUserOpen, setEditUserOpen] = useState(false)
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between'>
          <div>
            <NavLink className={({isActive})=>`w-12 flex h-12 justify-center items-center cursor-pointer  hover:bg-slate-200 ${isActive && 'bg-slate-200' }`} title='chat'>
                     <IoChatbubbleEllipses size={25}></IoChatbubbleEllipses>
            </NavLink>
            <div title= 'add friend' className='w-12 flex h-12 justify-center items-center cursor-pointer  hover:bg-slate-200'>
                     <HiUserAdd size={30}></HiUserAdd>
            </div>
        </div>
        <div className='flex flex-col items-center'>
          <button className='justify-center mx-auto' title={user?.name } onClick={()=>setEditUserOpen(true)}>
            <Avatar width={40} height={40} name={user?.name} imageUrl={user?.profile_pic}></Avatar>
          </button>
          <button className='w-12 flex h-12 justify-center items-center cursor-pointer  hover:bg-slate-200'>
            <span>
            <BiLogOut size={25}/>
              </span>

          </button>
        </div>
        </div>
        <div className='w-full'>
          <div className='h-16 flex items-center'>
          <h2  className='text-lg font-bold p-4  text-slate-600'>Message</h2> 
          
          </div>
          <div className='bg-slate-200 p-[0.5px]'> </div>

            <div className='bg-red-500  h-[cal(100vh-64px)] overflow-x-hidden overflow-y-scroll'></div>
        </div>
    {
      editUserOpen && <EditUserInfo onClose={()=>setEditUserOpen(false)} user={user}></EditUserInfo>
    }
    </div>
  )
}

export default Sidebar