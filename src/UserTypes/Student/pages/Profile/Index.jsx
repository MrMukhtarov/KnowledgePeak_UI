import React from 'react'
import SideBar from  '../../components/SideBar/SideBar'
import Profile from '../../components/Profile/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10">
        <Profile/>
      </div>
    </div>
  )
}

export default Index