import React, { Fragment, useEffect, useState } from "react";
import logo from "../../images/logo.png"
import { useParams } from "react-router";
import Item from "../item";

function OrdersPage(props) {
    const [order, setOrder] = useState([]);
    const params = useParams();

    const getOrder = async() => {    
        try {
            const response = await fetch(`http://localhost:4000/order/${params.user_id}/${params.order_id}`);
            const parseRes = await response.json();
            setOrder(parseRes);
        } catch (err) {
            console.error(err);
        }   
    };

    const authorizeOrder = () => {
        if(props.user.id === order[0].user_id){
            if (order[0].paid === true){
                return true;
            } else {
                return false;
            };
        } else {
            return true;
        };
    };

    
    useEffect(() => {
        getOrder();
    }, []);

    

    return (
        <Fragment>
            <a href="/"><img src={logo} className="my-4" style={{width: "40%" }} alt="DAMP"/></a>
                    
            {order.map((x) => (
                <div>
                    <h1>Order n.{x.order_id}</h1>
                    <h4>Total: <span className="text-danger">{x.total_price} kč</span></h4>                   
                    <p>paid: {x.paid? "✔" : "❌"}</p>
                    <p className="mb-5">complete: {x.complete? "✔" : "❌"}</p>

                    <div className="row justify-content-center">
                         {x.list_of_items.map((item) => (
                        <Item 
                            id={item.id}   
                            name={item.name}
                            color={item.color}
                            category={item.category}
                            price={item.price}
                            amount={item.amount}
                            hidden={authorizeOrder()}
                            editOrder={props.editOrder}
                            className="col-lg-6"
                            width="18rem"
                            height="26rem"
                            imgHeight="18rem"
                        />
                    ))}
                    </div>
                   
                </div>
                
            ))}
            
        </Fragment>
    )
};

export default OrdersPage;