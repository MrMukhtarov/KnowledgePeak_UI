import React from 'react'
import SideBar from  '../../components/SideBar/Index'
import Home from '../../components/Home/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10">
        <Home/>
      </div>
    </div>
  )
}

export default Index