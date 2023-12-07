import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './navbar.css'

export class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="main">
        <div className="nav">
          <div className="logo">
            <img src='vector.svg' alt="Logo" />
            <h1>Aahar</h1>
          </div>
          <div className="links">
          <Link to="/Home"> Home </Link>
            <Link to="/Bmi"> BMI </Link>
            <Link to="/Calorie">Calorie Calculator</Link>
            <Link to="/HealthBot">Health Bot</Link>
            <Link to="/page">Journal</Link>
            <a href="">Blogs</a>
            <a href="https://discord.gg/cszTEd5f">Community Page</a>
            {/* <Link to="/ContactForm">Contact Us</Link> */}
          </div>
          <div className="log-in">
            <button className="login"><Link to="/login"> Login </Link></button>
          </div>
          <div className="sign-up">
            <button className="signup"><Link to="/signup"> Sign Up </Link></button>
          </div>
        </div>
      </div>
      </div>
      
    )
  }
}

export default Navbar
