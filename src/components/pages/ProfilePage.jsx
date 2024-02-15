import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import shopImg from "../../images/shop.png"

function ProfilePage ({setAuth}) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [hidden, setHidden] = useState(false);
    const [hiddenAdmin, setHiddenAdmin] = useState(true)

    const getUser = async() => {
        try {
           const response = await fetch("http://localhost:4000/dashboard/", {
            method: "GET",
            headers: { token: localStorage.token }
           });
           const parseRes = await response.json();
           setName(parseRes.user_name);
           setEmail(parseRes.user_email);
           if(parseRes.admin === true){
            setHiddenAdmin(false);
           } else {
            setHiddenAdmin(true);
           }
        } catch (err) {
            console.error(err.message);
        }
    };

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false)
    };


    useEffect(() => {
        getUser()
    }, []);
    
    return (
        <Fragment>
            <a href="/discover"><img src={logo} className="mt-5" style={{width: "20rem" }} alt="&& logo"/></a>
            
            <h1 className="my-5">Welcome, {name} !</h1>
            

            <div className="grid-profile" >
                <div className="userData">
                    <h3 className="my-3">User Credentials</h3>
                    <Link hidden={hiddenAdmin} className="text-danger mt-5" to="/admin/create">! Click here for Admin Page !</Link>
                    <h6 className="mt-3">user_name: <u className="text-primary">{name}</u></h6>
                    <h6>email: <u className="text-primary">{email}</u></h6>
                    
                    <button onClick={e => logout(e)} className="btn btn-outline-danger">Logout</button>
                </div>
                <div>
                    <a href="/discover"><img src={shopImg} alt="Click here to go shopping" className="shopImg"/></a>
                </div>  
            </div>
            <div id="prevOrders" className="col-lg-12 my-5">
                    <h3 className="my-3">Previous Orders</h3>
                    <p hidden={hidden} className="my-5">Orders list is Empty.</p>
            </div>
        </Fragment>
    );
    
};

export default ProfilePage;

