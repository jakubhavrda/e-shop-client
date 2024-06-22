import React, { Fragment, useEffect, useState } from "react";

const AdminOrders = () => {
    
    const [orders, setOrders] = useState([]);
    const [order_id, setOrderId] = useState("");
    console.log(orders);

    const getOrders = async() => {
        const response = await fetch("http://localhost:4000/admin/orders");
        const parseRes = await response.json();
        setOrders(parseRes);
    };

    const completeOrder = async(e) => {
      e.preventDefault();
      try { 
        const response = await fetch("http://localhost:4000/order/complete", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({order_id}) 
        });
        const parseRes = await response.json();
        window.location = "/admin/orders";
      } catch (err) {
        console.error(err);
      }
      
    };

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
                       <th>User</th>
                       <th>Complete</th>
                       <th>Paid</th>
                       <th>Details</th>
                   </tr>
                </thead>
                <tbody>   
                    {orders.map((order, index) => (
                        <tr key={index} className={order.complete ? "border-success" : "border-danger"}>
                            <td>{order.order_id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.complete? "✔" : order.paid? <button id="orderId" type="button" data-bs-toggle="modal" onClick={() => setOrderId(order.order_id)} data-bs-target="#modalComplete" className="btn btn-warning">Finish!</button> : "❌"} </td>
                            <td>{order.paid? "✔" : "❌"} </td>
                            <td><a href={"/order/"+ order.user_id + "/" + order.order_id} className="text-primary">Details</a></td>
                        </tr>
                   ))}
                </tbody> 
            </table>
            <div className="modal fade" id="modalComplete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Warning!</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Do you want to complete the order!
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={completeOrder}>YES</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Not yet.</button>
                  </div>
                </div>
              </div>
            </div>
        </Fragment>
    );
};

export default AdminOrders;

