import React from 'react'
import './SideNave.css';

import back_cloud from '../assets/back_img.jpg'

export default function SideNave() {
  return (
    <div className='sideNave_container'>
        <img src={back_cloud} alt='구름 배경' />
    </div>
  )
}
