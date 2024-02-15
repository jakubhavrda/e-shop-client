import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Searchbar(props){
    const [hidden, setHidden] = useState(false);
    const [query, setQuery] = useState("");
    const [arrayQuery, setArrayQuery] = useState([]);
    
    const user = props.user;


    function checkUser() {
       if(user.name === ""){
        setHidden(false)
        } else {
        setHidden(true)
        }; 
    };

    function capitalizeFirstLetter() {
        return query.charAt(0).toUpperCase() + query.slice(1);
    }

    
    const queryFunction = async(e) => {
        e.preventDefault();
        try {
            if(query === ""){
                setArrayQuery([]);
            } else {
                const body = {name: "%" + capitalizeFirstLetter() + "%"}
                const response = await fetch("http://localhost:4000/searchbar", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                const data = await response.json();

                setArrayQuery(data);

                if(data.length === 0){
                    toast.error("No items were found!")
                }
            };
            
            
            props.getQuery(arrayQuery);
        } catch (err) {
            console.error(err.message);
        }
        
    };

    
    useEffect(() => {
        checkUser();
    }, []);


   

    return (
        <Fragment>
            <br />
            <form onSubmit={queryFunction} style={{display: "flex", gap: "2rem", marginLeft: "3rem", height: "3rem"}}>
                <div  style={{display: "flex", gap: "1rem"}} className={hidden ? "col-md-11" : "col-md-8"}>
                    <input type="search" value={query} onChange={e => setQuery(e.target.value)} className="border-secondary form-control" placeholder="Search for products. . ."/>
                </div>
                <div hidden={hidden} className="col-md-4">
                    <a href="/login"><p style={{marginRight: "1rem"}} className="btn btn-lg btn-outline-info">Login</p></a>
                    <a href="/register"><p className="btn btn-lg btn-info">Register</p></a>
                </div> 
            </form>
            <br />
            <ToastContainer />
            
        </Fragment>
    )
};

export default Searchbar;

