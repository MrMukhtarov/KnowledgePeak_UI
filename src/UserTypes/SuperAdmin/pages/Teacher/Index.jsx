import React from 'react'
import MobileMenu from '../../components/SuperAdminMobileMenu/Index'
import SideBar from '../../components/Sidebar/Index'
import Teacher from '../../components/TeacherAll/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <MobileMenu/>
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadmin_home">
        <Teacher/>
    </div>
  </div>
  )
}

export default Index