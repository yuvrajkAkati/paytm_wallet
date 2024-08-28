import React, { Suspense, useState } from 'react'
import { BrowserRouter ,Route , Routes } from 'react-router-dom'
import './App.css'

const SignUpPage = React.lazy(()=>import('./page/SignUpPage'))
const SignInPage = React.lazy(()=>import('./page/SignInPage'))
const DashboardPage = React.lazy(()=>import('./page/DashboardPage'))
const SendMoneyPage = React.lazy(()=>import('./page/SendMoneyPage'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Suspense fallback={'loading...'}><SignUpPage></SignUpPage></Suspense>}></Route>
        <Route path='/signin' element={<Suspense fallback={'loading...'}><SignInPage/></Suspense>}></Route>
        <Route path='/dashboard' element={<Suspense fallback={'loading...'}><DashboardPage/></Suspense>}></Route>
        <Route path='/send' element={<Suspense fallback={'loading...'}><SendMoneyPage/></Suspense>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
