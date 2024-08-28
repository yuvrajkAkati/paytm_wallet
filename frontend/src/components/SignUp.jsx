import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { InputBox } from './InputBox'
import { Button } from './Button'
import { BottomWarning } from './BottomWarning'
import { info } from 'autoprefixer'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Signup=()=>{
  const [firstName,setFirstName] =  useState('')
  const [lastName,setLastName] =  useState('')
  const [username,setUsername] =  useState('')
  const [password,setPassword] =  useState('')
  const navigate = useNavigate()
  const goToDashboardPage=()=>{
    navigate('/dashboard')
  }
    return(     
        <>
      <div className='flex justify-center bg-slate-300 h-screen '>
            <div className=" pt-9 ">
            <div className='bg-white border rounded-lg pb-3 px-5' >          
            <Heading heading={'Sign Up'}></Heading>
            <SubHeading subHeading={'Enter your information to create an account'}></SubHeading>
            <InputBox info={"First Name"} placeholder={'john'} onChange={(e)=>{
              setFirstName(e.target.value)
            }}></InputBox>
            <InputBox info={"Last Name"} placeholder={'doe'} onChange={(e)=>{
              setLastName(e.target.value)}} ></InputBox>
            <InputBox info={"Email"} placeholder={'johndoe@123.com'} onChange={(e)=>{
              setUsername(e.target.value)}}></InputBox>
            <InputBox info={"Password"} placeholder={'123456'} onChange={(e)=>{
              setPassword(e.target.value)
              }}></InputBox>
            <Button label={"Sign up"} onClick={async()=>{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username : username,
                firstName : firstName,
                lastName : lastName,
                password : password
              })  
              if(response.data.token){
                localStorage.setItem('token', response.data.token)
                goToDashboardPage()
              }
            }} ></Button>
            <div className='pb-1'>
            <BottomWarning label={"Login"} line={"Already have an account?"} to={'/signin'}>Sign Up</BottomWarning>
            </div>
            </div>
            </div>
      </div>
      </>
        )
}