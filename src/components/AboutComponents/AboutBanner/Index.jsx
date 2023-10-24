import React from 'react'
import './Index.css'
import banner from '../../../assets/about-banner.jpg'

const Index = () => {
  return (
    <section id='AboutBanner'>
        <div className="about_banner_img py-1">
            <img className='img-fluid' src={banner} alt="" />
            <h1>ABOUT US</h1>
        </div>
    </section>
  )
}

export default Index