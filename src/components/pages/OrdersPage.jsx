import React, { Fragment, useEffect, useState } from "react";
import logo from "../../images/logo.png"
import { useParams } from "react-router";
import Item from "../item";

function OrdersPage() {
    const [order, setOrder] = useState([]);
    const params = useParams();

    const getOrder = async() => {    
        try {
            const response = await fetch(`http://localhost:4000/order/${params.order_id}`);
            const data = await response.json();
            setOrder(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getOrder();
    }, [])
    
    console.log(order[0].paid);

    return (
        <Fragment>
            <img src={logo} className="my-4" style={{width: "40%" }} alt="DAMP"/>
            {order.map((x) => (
                <div>
                    <h1>Order n.{x.order_id}</h1>
                    <p>paid: {order.paid? "✔" : "❌"}</p>
                    <p className="mb-5">complete: {order.complete? "✔" : "❌"}</p>
                </div>
                
            ))}
            
        </Fragment>
    )
};

export default OrdersPage;