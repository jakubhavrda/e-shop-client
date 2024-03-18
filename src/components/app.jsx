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




const App = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
      id: "",
      name: "",
      email: ""
    });

    const [admin, setAdmin] = useState(false);
    const [order, setOrder] = useState([]); 
    

    const getOrder = async() => {
      const user_id = user.id;
      const body = {user_id}
      if(user_id === "") {
        setOrder([])
      } else {
        const response = await fetch("http://localhost:4000/orderByUser", {
          method: "POST",
          headers: {"Content-Type": "Application/json"},
          body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        setOrder(parseRes);
        localStorage.setItem('order', JSON.stringify(parseRes))
      }
    };

    const editOrder = async(x) => {
      const order_id = order[0].order_id
      if(x.amount < 1){
        
        const removedItem = order[0].list_of_items.filter(item => item.id !== x.id);
        order[0].list_of_items = removedItem;
        const nubmer = removedItem.length;
        const toBack = [nubmer, order_id];
        console.log(toBack);

        await fetch("http://localhost:4000/order/edit",{ 
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(toBack)
        });
        //localStorage.setItem('order', JSON.stringify(order));
        window.location = "/";
      } else{
        // proceed to change amount
        console.log(order[0].list_of_items[0]);
      };
    };

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    };

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
              setUser({id: parseRes.user_id, name: parseRes.user_name, email: parseRes.user_email});

              const storedOrder = JSON.parse(localStorage.getItem("order"));
              setOrder(storedOrder);
             };
            
          } catch (err) {
              console.error(err.message);
          }
      };

    
      useEffect(() => {
        isAuth();
        getOrder();
        getUser();
        isAuth();
      }, []);

    
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage user={user} order={order} editOrder={editOrder}/>} />
                <Route exact path="/admin" element={admin ? <AdminPage user={user}/> : <NotFoundPage />}/>
                <Route exact path="/discover/:category/:itemId" element={<SingleItemPage user={user} order={order} editOrder={editOrder}/>} />
                <Route exact path="/order/:order_id" element={<OrdersPage user={user} editOrder={editOrder}/>} />
                <Route path="*" element={<NotFoundPage />} />

                <Route exact path="/login" element={ !isAuthenticated ? <LoginPage setAuth={setAuth} /> : <Navigate to="/profile" /> } />
                <Route exact path="/register" element={ !isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login" /> } />
                <Route exact path="/profile" element={  isAuthenticated ? <ProfilePage setAuth={setAuth} user={user} admin={admin} /> : <Navigate to="/login" /> } />
                
           </Routes>
        </BrowserRouter> 
    )
};


export default App;