import React from 'react'
import SideBar from  '../../components/SideBar/Index'
import Profile from '../../components/Profile/Index'

const Index = () => {
  return (
    <div className="d-flex">
     <div className="col-lg-2">
        <div style={{backgroundColor:"#001529", width:"200px",height:"100%"}}>
          <SideBar />
        </div>
      </div>
      <div className="col-lg-10">
        <Profile/>
      </div>
    </div>
  )
}

export default Index