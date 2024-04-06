import React, { Fragment, useEffect, useState } from "react";

const AdminOrders = () => {
    
    const [orders, setOrders] = useState([]);
    console.log(orders);

    const getOrders = async() => {
        const response = await fetch("http://localhost:4000/admin/orders");
        const parseRes = await response.json();
        setOrders(parseRes)
    };

    const completeOrder = async() => {
        
    }

    useEffect(() => {
        getOrders();
    }, []);
    
    return (
        <Fragment>

            <h1 className="my-3">Orders</h1>

            <table className="table my-5">
                <thead>
                   <tr>
                       <th>Order_ID</th>
                       <th>Complete</th>
                       <th>Paid</th>
                       <th>Details</th>
                   </tr>
                </thead>
                <tbody>   
                    {orders.map((order, index) => (
                        <tr key={index} className={order.complete ? "border-success" : "border-danger"}>
                            <td>{order.order_id}</td>
                            <td>{order.complete? "✔" : order.paid? <button type="button" data-bs-toggle="modal" data-bs-target="#modalComplete" className="btn btn-warning">Finish!</button> : "❌"} </td>
                            <td>{order.paid? "✔" : "❌"} </td>
                            <td><a href={"/order/"+ order.user_id + "/" + order.order_id} className="text-primary">Details</a></td>
                        </tr>
                   ))}
                </tbody> 
            </table>
            <div class="modal fade" id="modalComplete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Warning!</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Do you want to set order to complete!
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success">YES</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Not yet.</button>
                  </div>
                </div>
              </div>
            </div>
        </Fragment>
    );
};

export default AdminOrders;

