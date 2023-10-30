import React from 'react'
import SideBar from  '../../components/SideBar/Index'
import Dashboard from '../../components/Dashboard/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <div className="col-lg-1">
        <SideBar />
      </div>
      <div className="col-lg-11">
        <Dashboard/>
      </div>
    </div>
  )
}

export default Index