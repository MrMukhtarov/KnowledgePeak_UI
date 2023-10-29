import React from 'react'
import './Index.css'
import MobileMenu from '../../components/SuperAdminMobileMenu/Index'
import SideBar from '../../components/Sidebar/Index'
import Lesson from '../../components/LessonList/Index'

const Index = () => {
  return (
    <div className="d-flex">
    <MobileMenu/>
    <div className="col-lg-2">
      <SideBar />
    </div>
    <div className="col-lg-10 superadmin_home">
        <Lesson/>
    </div>
  </div>
  )
}

export default Index