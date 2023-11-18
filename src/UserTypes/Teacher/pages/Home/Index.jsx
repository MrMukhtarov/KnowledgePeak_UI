import React from 'react'
import SideBar from  '../../components/SideBar/Index'
import Dashboard from '../../components/Dashboard/Index'

const Index = () => {
  return (
    <div className="d-flex">
     <div className="col-lg-2">
      <div style={{backgroundColor:"#001529", width:"200px",height:"100%"}}>
          <SideBar />
        </div>
      </div>
      <div className="col-lg-10">
        <Dashboard/>
      </div>
    </div>
  )
}

export default Index