import React, { useState } from "react";
import logo from "../images/logo.png"
import Item from "./item";
import "../styles.css"
function Navbar(props){
    const user = props.user;
    const order = props.order;
    const [hidden, setHidden] = useState(true);
    const name = user.name;

    const mouseOn = async() => {
     if(!user){
      setHidden(false);
     }
    };
    const mouseOff = async() => {
      setHidden(!hidden);
    };

    const checkOrder = () => {
      if(order.length === 0){
        return (<p className="my-5">Order is Empty</p>)
      } else if(order[0].list_of_items.length === 0){
        return (<p className="my-5">Order is Empty</p>)
      } else if (order[0].user_id !== user.id){
        console.log(user.id);
        console.log(order[0].user_id);
        return (<p className="my-5">Order is Empty</p>)
      } else {
        
       

        return (
          <div className="d-flex flex-column-reverse align-items-center ">
            <div>
              <h5 className="text-danger">total: {order[0].total_price} CZK</h5>
              <a href="/myOrder"><h5 className="my-3 btn btn-success">Finish Order!</h5></a>
            </div>
            
            {order[0].list_of_items.map(item => (
              <div className="my-3">
                <Item
                  id={item.id}
                  name={item.name.substring(0,9)+ "..."}
                  price={item.price}
                  category={item.category}
                  color={item.color}
                  amount={item.amount}
                  in_stock={item.in_stock}
                  editOrder={props.editOrder}
                  notInOrder={false}
                  hidden={false}
                  width="12rem"
                  height="19rem"
                  imgHeight="11rem"
                />
              </div>
            ))}
            
          </div>
          );
      }
    }
    
    return(
        <div className="header">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  <img src={logo} alt="&&" width="120" height="40" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">New Offers</a>
                    </li>
                    <li className="nav-item profile-icon">
                      <a className="nav-link icon"><i onMouseOver={mouseOn} onClick={mouseOff} className="fa-solid fa-basket-shopping" ></i></a>
                      <a className="nav-link icon" href="/profile"><span style={{fontSize: "70%"}} className="text-success">{name}</span> <i className="fa-regular fa-1x fa-circle-user"></i></a>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </nav>
            
              <div hidden={hidden} className="hiddenDiv" >
                <h6 className="mt-3"><a href="/myOrder">My Cart!</a></h6>
                {checkOrder()}
              </div>
            
        </div>
    );
};

export default Navbar;