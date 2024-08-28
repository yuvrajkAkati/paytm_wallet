import axios from "axios"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export const SendMoney = ()=>{

    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const [amount,setAmount] =  useState(0)

    const navigate = useNavigate()
    function goToDashboardPage(){
        navigate('/dashboard')
    }

    return (
        <>
        <div className="bg-white-500 flex justify-center pt-40 ">
        <div className="bg-white-500 pt-7 rounded shadow-md w-80 h-">
            <div className="text-center font-bold pb-10">
                Send Money
            </div>
            <div className="flex ">
                <div className="pl-2 ">
                    <div className="text-white bg-green-500 w-6 h-6 text-center rounded-full">
                        {name.toUpperCase().charAt(0)}
                    </div>
                </div>
                <div className="pl-1.5">
                    {name}
                </div>
            </div>
            <div className="text-xs pt-2 pl-4 font-semibold">
                amount(in rupees)
            </div>
            <div className="pl-4 pr-4 ">
                <input onChange={(e)=>{
                    setAmount(e.target.value)
                }} type="Number" placeholder="Enter Amount" min="0" className="border border-slate-500 h-6 w-full text-xs rounded pl-1" />
            </div>
            <div className="pt-3 px-4 pb-7">
                <button className="bg-green-500 w-full rounded text-sm py-1 text-white" onClick={async()=>{
                   const user1 = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                    to : id,
                    amount
                   },{
                    headers :{
                        Authorization : "bearer " + localStorage.getItem('token')
                    }
                   })
                   if(user1.status == 200){
                    goToDashboardPage()
                   }
                }}>Initiate Transfer</button>
            </div>
            </div>
        </div>
        </>
    )
}





{/* <div className="bg-white pt-7 rounded shadow-md ">
            
            <div className="flex ">
                <div className="pl-2 ">
                    <div className="text-white bg-green-500 w-6 h-6 text-center rounded-full">
                        A
                    </div>
                </div>
                <div className="pl-1.5">
                    Friend's name
                </div>
            </div>
            <div className="text-xs pt-2 pl-4 font-semibold">
                amount(in rupees)
            </div>
            <div className="pl-4 pr-4 ">
                <input type="Number" placeholder="Enter Amount" className="border border-slate-500 h-6 w-full text-xs rounded pl-1" />
            </div>
            <div className="pt-3 px-4 pb-7">
                <button className="bg-green-500 w-full rounded text-sm py-1 text-white">Initiate Transfer</button>
            </div>
            </div> */}


            {/* <div className="bg-white pt-7 rounded shadow-md ">
            <div className="text-center font-bold pb-10">
                Send Money
            </div>
            <div className="flex ">
                <div className="pl-2 ">
                    <div className="text-white bg-green-500 w-6 h-6 text-center rounded-full">
                        A
                    </div>
                </div>
                <div className="pl-1.5">
                    Friend's name
                </div>
            </div>
            <div className="text-xs pt-2 pl-4 font-semibold">
                amount(in rupees)
            </div>
            <div className="pl-4 pr-4 ">
                <input type="Number" placeholder="Enter Amount" className="border border-slate-500 h-6 w-full text-xs rounded pl-1" />
            </div>
            <div className="pt-3 px-4 pb-7">
                <button className="bg-green-500 w-full rounded text-sm py-1 text-white">Initiate Transfer</button>
            </div>
            </div> */}