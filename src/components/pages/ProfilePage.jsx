import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import shopImg from "../../images/shop.png"

function ProfilePage (props) {
    
    const user = props.user;
    
    const [prevOrders, setPrevOrders] = useState([]);
    const [hidden, setHidden] = useState(false);
    console.log(prevOrders);
    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
    };

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
    }, [user.id, ""]); // <------- checks if user.id and "" are different so if yes then run, works nicely

    return (
        <Fragment>
            <a href="/"><img src={logo} className="mt-5" style={{width: "20rem" }} alt="&& logo"/></a>
            
            <h1 className="my-5">Welcome, {user.name} !</h1>
            

            <div className="flex-profile" >
                <div className="userData flex-profile-child">
                    <h3 className="my-3">User Credentials</h3>
                    <Link hidden={!props.admin} className="text-danger mt-5" to="/admin">! Click here for Admin Page !</Link>
                    <h6 className="mt-3">user_name: <u className="text-success">{user.name}</u></h6>
                    <h6>email: <u className="text-success">{user.email}</u></h6>
                    
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

