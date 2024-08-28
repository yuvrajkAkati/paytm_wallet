import Input from "postcss/lib/input";
import { AppBar } from "./AppBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export function Dashboard(){
    const [users ,setUsers] = useState([])
    const [filter , setFilter] = useState('')
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(async function(response){
            const users = await response.data.user
            setUsers(users)
    })},[filter])

    return <>
    <div>
        <AppBar user={'yuvraj'}></AppBar>
        <div className="font-bold pt-5 px-5">
            Your Balance $5000
        </div>
        <div className="px-5 pt-4 font-bold">
            Users
        </div>
        <div className="pl-6 pr-6 pt-3 ">
            <input className="border-2 rounded w-full text-sm h-8 pl-2" placeholder="Search users..." onChange={(e)=>{
                setFilter(e.target.value)
                // axios.get("http://localhost:3000/api/v1/user/bulk"+searchedName)
            }}/>
        </div> 
        {users.map((users)=>{
            return <Contact user={users}></Contact>
        })}
    </div>
    </>
}

export function Contact({user}){
    const navigate = useNavigate()
    
    const goToSendMoneyPage=()=>{
        navigate('/send?id=' + user._id + '&name=' + user.firstName)
    }

return (<div className="flex  justify-between pt-8">
        <div className="flex pl-6">
            <div className="bg-slate-200 rounded-full w-8 text-center text-lg pb-1">
                {user.firstName.toUpperCase().charAt(0)}
            </div>
            <div className="text-center pl-2 text-center text-xl font-semibold">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="pr-6">
            <button className="bg-black text-white rounded-md text-sm h-8 w-24 text-slate-200" onClick={()=>{
                goToSendMoneyPage()

            }}>Send Money</button>
        </div>
    </div>)
}

