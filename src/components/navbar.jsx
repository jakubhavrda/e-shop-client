import React, { useState } from "react";
import logo from "../images/logo.png"
import "../styles.css"
function Navbar(props){
    const user = props.user;
    const order = props.order;
    const [hidden, setHidden] = useState(true);

    const name = user.name;

    console.log(order);

    const mouseOn = async() => {
      setHidden(false);
    };
    const mouseOff = async() => {
      setHidden(true);
    };


    

    return(
        <div className="header">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  <img src={logo} alt="&&" width="120" height="40" />
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">New Offers</a>
                    </li>
                    
                    <li className="nav-item profile-icon">
                      <a className="nav-link icon" href="/myOrder"><i onMouseOver={mouseOn} onMouseOut={mouseOff} className="fa-solid fa-basket-shopping" ></i></a>
                      <a className="nav-link icon" href="/profile"><span style={{fontSize: "70%"}} className="text-success">{name}</span> <i className="fa-regular fa-1x fa-circle-user"></i></a>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </nav>
            <div hidden={hidden} className="hiddenDiv">
              <p>My Order!</p>
              
            </div>
        </div>
    );
};

export default Navbar;