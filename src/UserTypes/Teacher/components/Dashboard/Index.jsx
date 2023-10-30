import React from 'react'
import './Index.css'
import img1 from '../../../../assets/teacher-icon-01.svg'
import img2 from '../../../../assets/stu.svg'
import img3 from '../../../../assets/lesson.svg'

const Index = () => {
  return (
    <section className='teacher_dashboard py-3 h-100'>
        <div className="container">
            <h1 className='teacher_dashboard_title'>Welcome Nicat</h1>
            <div className="teacher_dashboard_top d-flex justify-content-center gap-5 mt-5">
                <div className="teacher_dashboard_top_box col-lg-3 d-flex justify-content-between align-items-center">
                    <div className="teacher_dashboard_top_box_left">
                        <h6>Total Lessons</h6>
                        <h3>50</h3>
                    </div>
                    <div className="teacher_dashboard_top_box_right">
                        <img src={img3} alt="" />
                    </div>
                </div>

                <div className="teacher_dashboard_top_box col-lg-3 d-flex justify-content-between align-items-center">
                    <div className="teacher_dashboard_top_box_left">
                        <h6>Total Groups</h6>
                        <h3>50</h3>
                    </div>
                    <div className="teacher_dashboard_top_box_right">
                        <img src={img1} alt="" />
                    </div>
                </div>

                <div className="teacher_dashboard_top_box col-lg-3 d-flex justify-content-between align-items-center">
                    <div className="teacher_dashboard_top_box_left">
                        <h6>Total Students</h6>
                        <h3>50</h3>
                    </div>
                    <div className="teacher_dashboard_top_box_right">
                        <img src={img2} alt="" />
                    </div>
                </div>
            </div>
            <div className="teacher_dashboard_bottom mt-5">
                        <h5 className='teacher_dashboard_bottom_title text-center mb-4'>Upcoming Lesson</h5>
                <div className="teacher_dashboard_bottom_all d-flex justify-content-center flex-wrap gap-3">
                    <div className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="teacher_dashboard_bottom_box_top text-center">
                            <span className='text-center'>P128</span>
                        </div>
                        <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                            <span><i className="fa-solid fa-calendar-days me-1"></i>10-30-2023</span>
                            |
                            <span><i class="fa-solid fa-clock me-1"></i>09:00-10:00</span>
                        </div>
                    </div>
                    <div className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="teacher_dashboard_bottom_box_top text-center">
                            <span className='text-center'>P128</span>
                        </div>
                        <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                            <span><i className="fa-solid fa-calendar-days me-1"></i>10-30-2023</span>
                            |
                            <span><i class="fa-solid fa-clock me-1"></i>09:00-10:00</span>
                        </div>
                    </div>
                    <div className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="teacher_dashboard_bottom_box_top text-center">
                            <span className='text-center'>P128</span>
                        </div>
                        <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                            <span><i className="fa-solid fa-calendar-days me-1"></i>10-30-2023</span>
                            |
                            <span><i class="fa-solid fa-clock me-1"></i>09:00-10:00</span>
                        </div>
                    </div>
                    <div className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="teacher_dashboard_bottom_box_top text-center">
                            <span className='text-center'>P128</span>
                        </div>
                        <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                            <span><i className="fa-solid fa-calendar-days me-1"></i>10-30-2023</span>
                            |
                            <span><i class="fa-solid fa-clock me-1"></i>09:00-10:00</span>
                        </div>
                    </div>
                    <div className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="teacher_dashboard_bottom_box_top text-center">
                            <span className='text-center'>P128</span>
                        </div>
                        <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                            <span><i className="fa-solid fa-calendar-days me-1"></i>10-30-2023</span>
                            |
                            <span><i class="fa-solid fa-clock me-1"></i>09:00-10:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Index