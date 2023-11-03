import React from 'react'
import SideBar from '../../components/Sidebar/Index'
import Student from '../../components/StudentList/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadmin_home">
        <Student/>
    </div>
  </div>
  )
}

export default Index