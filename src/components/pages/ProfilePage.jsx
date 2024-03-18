import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import shopImg from "../../images/shop.png"

function ProfilePage (props) {
    const user = props.user;
    console.log(user);
    const [prevOrders, setPrevOrders] = useState([]);
    localStorage.getItem("token");
    const [hidden, setHidden] = useState(false);


    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
    };

    const getPrevOrders =  async() => {
        try {
            if(user.id === ""){
                setHidden(false);
                setPrevOrders([])
            } else {
                const user_id = user.id
                const response = await fetch("http://localhost:4000/usersOrders", {
                    method: "POST",
                    headers: {"Content-Type":"Application/json"},
                    body: JSON.stringify({user_id})
                });
                const parseRes = await response.json()
                if(parseRes) {
                    setHidden(true);
                    setPrevOrders(parseRes)
                }else{
                    setPrevOrders([]);
                    setHidden(false);
                };

            }
            
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPrevOrders();
    }, []); // <-- dunno if array is needed

    return (
        <Fragment>
            <a href="/"><img src={logo} className="mt-5" style={{width: "20rem" }} alt="&& logo"/></a>
            
            <h1 className="my-5">Welcome, {user.name} !</h1>
            

            <div className="grid-profile" >
                <div className="userData grid-profile-child">
                    <h3 className="my-3">User Credentials</h3>
                    <Link hidden={!props.admin} className="text-danger mt-5" to="/admin">! Click here for Admin Page !</Link>
                    <h6 className="mt-3">user_name: <u className="text-primary">{user.name}</u></h6>
                    <h6>email: <u className="text-primary">{user.email}</u></h6>
                    
                    <button onClick={e => logout(e)} className="btn btn-outline-danger">Logout</button>
                </div>
                <div className="grid-profile-child">
                    <a href="/"><img src={shopImg} alt="Click here to go shopping" className="shopImg"/></a>
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
                               <th>Details</th>
                           </tr>
                        </thead>
                        <tbody>
                           
                               {prevOrders.map((order, index) => (
                                    <tr key={index} className={order.complete ? "bg-light" : "bg-warning"}>
                                        <td>{order.order_id}</td>
                                        <td>{order.complete? "✔" : "❌"} </td>
                                        <td><a href={"/order/" + order.order_id} className="text-primary">Details</a></td>
                                    </tr>
                               ))}
                           
                          
                        </tbody> 
                    </table>
            </div>
        </Fragment>
    );
    
};

export default ProfilePage;

