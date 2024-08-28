  import { Heading } from "./Heading"
import { SubHeading } from "./SubHeading"
import { InputBox } from "./InputBox"
import { Button } from "./Button"
import { BottomWarning } from "./BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Signin=()=>{
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState('')
  const navigate = useNavigate()
  const goToDashboardPage=()=>{
    navigate('/dashboard')
  }
    return(     
        <>
      <div className='flex justify-center bg-slate-300 h-screen '>
            <div className=" pt-9 py-20 ">
            <div className='bg-white border rounded-lg px-5 py-4'>          
            <Heading heading={'Sign In'}></Heading>
            <SubHeading subHeading={'Enter your credentials to access your account'}></SubHeading>
            <InputBox info={"Email"} placeholder={'johndoe@123.com'} onChange={(e)=>{
              setUsername(e.target.value)
            }} ></InputBox>
            <InputBox info={"Password"} placeholder={'123456'} onChange={(e)=>{
              setPassword(e.target.value)
            }}></InputBox>
            <Button label={"Sign In"} onClick={async()=>{
              const response =  await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
              }) 
              if(response.data.token){
                localStorage.setItem('token' , response.data.token)
                goToDashboardPage()
              }
            }}></Button>
            <BottomWarning label={"Sign Up"} line={"Don't have an account?"} to={'/signup'}>Sign Up</BottomWarning>
            </div>
            </div>
      </div>
      </>
        )
}