import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleItemPage from "./pages/SingleItemPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import AdminOrders from "./pages/AdminOrders";


const App = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
      id: "",
      name: "",
      email: ""
    });

    const [admin, setAdmin] = useState(false);
    const [order, setOrder] = useState([]);
    
    
    //// GET ORDER ////

    const getOrder = async(user) => {
      if(user.id === "") {
        setOrder([]);
      } else {
        const response = await fetch(`http://localhost:4000/orderByUser/${user.id}`);
        const parseRes = await response.json();
        localStorage.setItem("order", JSON.stringify(parseRes));
        setOrder(JSON.parse(localStorage.getItem("order")));
      }
    };

    //// EDIT ORDER ////

    const editOrder = async(x) => {
      const order_id = order[0].order_id
     
      if(x.amount < 1){
        
        const removedItem = order[0].list_of_items.filter(item => item.id !== x.id);
        order[0].list_of_items = removedItem;
        const list_of_items = order[0].list_of_items;
        const number = list_of_items.length;
        const toBack = {number, order_id, list_of_items};
        setOrder(order);
        const response = await fetch("http://localhost:4000/order/edit",{ 
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(toBack)
        });
        const parseRes = await response.json();
        setOrder(parseRes);
        
      } else{

        const itemToEdit = order[0].list_of_items.filter(item => item.id === x.id);
        itemToEdit[0].amount = x.amount;

        const number = order.length;
        const list_of_items = order[0].list_of_items;
        const toBack = {number, order_id, list_of_items}

        let total_price = 0;
        order[0].list_of_items.forEach(item => {
          total_price += (item.price*item.amount)
        });
        order[0].total_price = total_price;
        setOrder(order);


        const response = await fetch("http://localhost:4000/order/edit", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(toBack)
        });
        const parseRes = await response.json();
        console.log(parseRes);
        setOrder(parseRes);
      };

      if(window.location.href === `http://localhost:3000/order/${user.id}/${order[0].order_id}`){
        window.location = `http://localhost:3000/order/${user.id}/${order[0].order_id}`;
      }; 
    };

    //// SET AUTH ////

    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };

    //// IS AUTH ////

    async function isAuth() {
        try {
          const response = await fetch("http://localhost:4000/auth/verify",{
            method: "GET",
            headers: { token: localStorage.token }
          });
          const parseRes = await response.json();
          
          parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
        } catch (err) {
          console.error(err.message)
        }
      };

      //// GET USER ////

      const getUser = async() => {
          try {
            const response = await fetch("http://localhost:4000/dashboard/", {
             method: "GET",
             headers: { token: localStorage.token }
            });
            const parseRes = await response.json(); 
            if(parseRes === "Not Authorize"){
             setUser({id: "", name: "", email: ""})
             setAdmin(false)
            } else {
             setAdmin(parseRes.admin)
             localStorage.setItem("user", JSON.stringify({id: parseRes.user_id, name: parseRes.user_name, email: parseRes.user_email}));
             setUser(JSON.parse(localStorage.getItem("user")));

             getOrder(JSON.parse(localStorage.getItem("user"))); // with code like this order changes with user!
            };
            
          } catch (err) {
            console.error(err.message);
          }
      };

    
      useEffect(() => {
        isAuth();
        getUser();
        
      }, []);

    
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage 
                                                user={user}
                                                order={order}
                                                editOrder={editOrder}
                                              />} />
                <Route exact path="/admin" element={admin ? <AdminPage user={user}/> : <NotFoundPage />}/>
                <Route exact path="/admin/orders" element={admin ? <AdminOrders user={user}/> : <NotFoundPage />}/>
                <Route exact path="/discover/:category/:itemId" element={<SingleItemPage user={user} order={order} editOrder={editOrder}/>} />
                <Route exact path="/order/:user_id/:order_id" element={<OrdersPage user={user} editOrder={editOrder}/>} />
                <Route path="*" element={<NotFoundPage />} />

                <Route exact path="/login" element={ !isAuthenticated ? <LoginPage setAuth={setAuth} /> : <Navigate to="/profile" /> } />
                <Route exact path="/register" element={ !isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login" /> } />
                <Route exact path="/profile" element={  isAuthenticated ? <ProfilePage setAuth={setAuth} getUser={getUser} user={user} admin={admin} /> : <Navigate to="/login" /> } />
           </Routes>
        </BrowserRouter> 
    )
};


export default App;