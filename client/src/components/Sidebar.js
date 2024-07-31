import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import {NavLink} from  'react-router-dom';
import Avatar from "./Avatar"
import {useSelector} from 'react-redux'
import EditUserInfo from './EditUserInfo';

const Sidebar = () => {
  const user = useSelector(state => state?.user)
  const [editUserOpen, setEditUserOpen] = useState(false)
  return (
    <div className='w-full h-full'>
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
    {
      editUserOpen && <EditUserInfo onClose={()=>setEditUserOpen(false)} user={user}></EditUserInfo>
    }
    </div>
  )
}

export default Sidebar