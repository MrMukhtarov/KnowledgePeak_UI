import React from 'react'
import SideBar from  '../../components/SideBar/SideBar'
import History from '../../components/History/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10">
        <History/>
      </div>
    </div>
  )
}

export default Index