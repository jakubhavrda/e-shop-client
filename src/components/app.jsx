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

    const [order, setOrder] = useState([]);  // <-- order should be global and stable!
    

    const getOrder = async() => {
      const user_id = user.id;
      const body = {user_id}
      if(user_id === "") {
        setOrder("Order is Empty!")
      } else {
        const response = await fetch("http://localhost:4000/orderByUser", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        setOrder(parseRes[0]);
        console.log(order);
      }
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
              setUser({id: parseRes.user_id, name: parseRes.user_name, email: parseRes.user_email})
             };
            
          } catch (err) {
              console.error(err.message);
          }
      };

    
      useEffect(() => {
        isAuth();
        getUser();
        getOrder();
        isAuth();
      }, []);
    
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage user={user} order={order}/>} />
                <Route exact path="/admin" element={admin ? <AdminPage user={user}/> : <NotFoundPage />}/>
                <Route exact path="/discover/:category/:itemId" element={<SingleItemPage user={user} order={order}/>} />
                <Route exact path="/order/:order_id" element={<OrdersPage />} />
                <Route path="*" element={<NotFoundPage />} />

                <Route exact path="/login" element={ !isAuthenticated ? <LoginPage setAuth={setAuth} /> : <Navigate to="/profile" /> } />
                <Route exact path="/register" element={ !isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login" /> } />
                <Route exact path="/profile" element={  isAuthenticated ? <ProfilePage setAuth={setAuth} /> : <Navigate to="/login" /> } />
                
           </Routes>
        </BrowserRouter> 
    )
};


export default App;