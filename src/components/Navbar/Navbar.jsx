import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import foodLogo from '../../assets/food-logo-template.png';  

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={foodLogo} alt="Logo" className="logo" />
      <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar
