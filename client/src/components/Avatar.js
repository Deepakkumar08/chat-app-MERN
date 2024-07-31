import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar=({userId,name,imageUrl,width,height})=>{
    let avaratname = ''
     if(name){
        console.log('datatat', userId,name,imageUrl,width,height)
        const splitname = name?.split(" ")
        if(splitname.length > 1){
            avaratname = splitname[0][0] + splitname[1][0] && splitname[1][0].toUpperCase()
        }
        else{
            avaratname=splitname[0][0]
        }
     }
     const bgColor =[
        'bg-slate-200',
        'bg-red-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-teal-200'
     ]
     const random = Math.floor(Math.random()*5)
    return(
        <div style={{width : width+'px' , height : height+'px '}} className={`text-slate-200 overflow-hidden shadow border text-2xl font-bold ${bgColor[random]}`}>
            {
                imageUrl ? 
                    (
                    <img 
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}>
                    </img>
                    )
                     : (
                        name ? (
                            <div style={{width : width+'px' , height : height+'px '}}  className="overflow-hidden rounded-full text-red-700 flex justify-center items-center">
                                <h2>{avaratname}</h2>
                            </div>

                        ):(
                           <PiUserCircle size={width} className=""></PiUserCircle>
                        )
                    )
            }
        </div>
    )

}
export default Avatar