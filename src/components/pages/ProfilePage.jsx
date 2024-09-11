import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import shopImg from "../../images/shop.png"

function ProfilePage (props) {
    
    const user = props.user;
    
    
    const [prevOrders, setPrevOrders] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [heading, setHeading] = useState(<h1 className="my-5">Welcome, {user.name} !</h1>)
    
    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
    };

    const checkBirthday = () => {
        const today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        let year = today.getFullYear();
        if(day < 10){
            day = "0" + day 
        }
        if(month < 10){
            month = "0" + month
        }
        const dayAndMonth = `${month}-${day}`;
        const usersDayAndMonth = user.dateOfBirth.substring(5,10);
        const usersYear = Number(user.dateOfBirth.substring(0,4));
        let age = `${year - usersYear}`;
        if(age.slice(-1) === "1"){
            age = age + "st"
        } else if(age.slice(-1) === "2"){
            age = age + "nd"
        } else if(age.slice(-1) === "3"){
            age = age + "rd"
        } else {
            age = age + "th"
        }
        if(usersDayAndMonth == dayAndMonth){
            setHeading(<h1 className="my-5 text-danger"><i className="fa-solid fa-cake-candles " /> Happy {age} Birthday, {user.name} <i className="fa-solid fa-cake-candles" /></h1>)
        } else {
            setHeading(<h1 className="my-5">Welcome, {user.name} !</h1>)
        }
    }

    const getPrevOrders = async(id) => {
        try {
            if(id === ""){
                setHidden(false);
                setPrevOrders([]);
            } else {
                const user_id = id;
                const response = await fetch("http://localhost:4000/usersOrders", {
                    method: "POST",
                    headers: {"Content-Type":"Application/json"},
                    body: JSON.stringify({user_id})
                });
                const parseRes = await response.json();
                if(parseRes) {
                    if(parseRes.length === 0){
                        setPrevOrders([]);
                        setHidden(false);
                    } else {
                        setPrevOrders(parseRes);
                        setHidden(true);
                    } 
                }else{
                    setPrevOrders([]);
                    setHidden(false);
                };
            };
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {   
        props.getUser();
        getPrevOrders(user.id);
        checkBirthday();
    }, [user.id, ""]); // <------- checks if user.id and "" are different so if yes then run, works nicely

    return (
        <Fragment>
            <a href="/"><img src={logo} className="mt-5" style={{width: "8rem" }} alt="&& logo"/></a>
            
            {heading}
            

            <div className="flex-profile" >
                <div className="userData flex-profile-child">
                    <h3 className="my-3">User Credentials</h3>
                    <Link hidden={!props.admin} className="text-danger mt-5" to="/admin">! Click here for Admin Page !</Link>
                    <h6 className="mt-3">user_name: <u className="text-success">{user.name}</u></h6>
                    <h6>email: <u className="text-success">{user.email}</u></h6>
                    <h6>date of birth: <u className="text-success">{user.dateOfBirth}</u></h6>
                    
                    <button onClick={e => logout(e)} className="btn btn-outline-danger">Logout</button>
                </div>
                <div className="flex-profile-child">
                    <a href="/"><img src={shopImg} alt="Click here to go shopping" className="shopImg" /></a>
                </div>  
            </div>
            
            
            
            <div id="prevOrders" className="col-lg-12 my-5">
                    <h3 className="my-3">Previous Orders</h3>
                    <p hidden={hidden} className="my-5">Orders list is Empty.</p>

                    <table className="table" hidden={!hidden}>
                        <thead>
                           <tr>
                               <th>Order_ID</th>
                               <th>Ready</th>
                               <th>Total</th>
                               <th>Details</th>
                           </tr>
                        </thead>
                        <tbody>   
                           {prevOrders.map((order, index) => (
                                <tr key={index} className={order.complete ? "border-success" : "border-danger"}>
                                    <td>{order.order_id}</td>
                                    <td>{order.complete? "✔" : "❌"} </td>
                                    <td>{order.total_price} kč</td>
                                    <td><a href={"/order/"+ order.user_id + "/" + order.order_id} className="text-primary">Details</a></td>
                                </tr>
                           ))}
                        </tbody> 
                    </table>
            </div>
        </Fragment>
    );
    
};

export default ProfilePage;

