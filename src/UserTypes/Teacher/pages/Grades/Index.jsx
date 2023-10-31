import React from 'react'
import './Index.css'
import SideBar from '../../components/SideBar/Index'
import Grades from '../../components/Grades/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10">
        <Grades/>
    </div>
  </div>
  )
}

export default Index