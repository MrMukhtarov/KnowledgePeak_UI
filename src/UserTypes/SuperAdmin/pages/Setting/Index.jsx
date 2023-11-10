import React from 'react'
import SideBar from "../../components/Sidebar/Index";
import MobileMenu from '../../components/SuperAdminMobileMenu/Index'
import Setting from '../../components/Setting/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <MobileMenu/>
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadim_setting">
       <Setting/>
    </div>
  </div>
  )
}

export default Index