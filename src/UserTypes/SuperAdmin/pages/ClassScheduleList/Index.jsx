import React from 'react'
import MobileMenu from '../../components/SuperAdminMobileMenu/Index'
import SideBar from '../../components/Sidebar/Index'
import Schedule from '../../components/ScheduleList/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <MobileMenu/>
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadmin_home">
        <Schedule/>
    </div>
  </div>
  )
}

export default Index