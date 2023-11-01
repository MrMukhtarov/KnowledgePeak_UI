import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/DashboardHeader/Index.jsx'

const Teacher = () => {
  return (
    <div>
        <Header/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Teacher