import React from 'react'
import SideBar from  '../../components/SideBar/SideBar'
import Profile from '../../components/Profile/Index'

const Index = () => {
  return (
    <div className="d-flex">
       <div style={{backgroundColor:"#001529", width:"200px",height:"700px"}}>
        <SideBar />
      </div>
      <div className="col-lg-10">
        <Profile/>
      </div>
    </div>
  )
}

export default Index