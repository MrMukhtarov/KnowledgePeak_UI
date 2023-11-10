import React from 'react'
import MobileMenu from '../../components/SuperAdminMobileMenu/Index'
import SideBar from '../../components/Sidebar/Index'
import SpecialityAll from '../../components/SpecialityAll/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <MobileMenu/>
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadmin_home">
        <SpecialityAll/>
    </div>
  </div>
  )
}

export default Index