import React, { Fragment, useEffect, useState } from "react";
import logo from "../../images/logo.png"
import { useParams } from "react-router";
import Item from "../item";

function OrdersPage(props) {
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
    
    console.log(order[0]);

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
                         {x.list_of_items.map((y) => (
                        <Item 
                            id={y.id}   
                            name={y.name}
                            color={y.color}
                            category={y.category}
                            price={y.price}
                            amount={y.amount}
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