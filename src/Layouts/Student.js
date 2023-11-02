import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/DashboardHeader/Index.jsx'

const Tutor = () => {
  return (
    <div>
        <Header/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Tutor