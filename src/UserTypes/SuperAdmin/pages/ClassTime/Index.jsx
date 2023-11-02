import React from 'react'
import SideBar from '../../components/Sidebar/Index'
import ClassTime from '../../components/ClassTimeList/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadmin_home">
        <ClassTime/>
    </div>
  </div>
  )
}

export default Index