import React, { Fragment, useEffect, useState } from "react";


function Searchbar(props){
    const [hidden, setHidden] = useState(false);
    const [query, setQuery] = useState("");
    const [arrayQuery, setArrayQuery] = useState([]);
    const [text404, setText404] = useState("");

    const [categories, setCategories] = useState([]);
    
    const user = props.user;


    function checkUser() {
       if(user.name === ""){
        setHidden(false)
        } else {
        setHidden(true)
        }; 
    };

    function capitalizeFirstLetter() {
        return query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
    }

    
    const queryFunction = async(e) => {
        e.preventDefault();
        try {
            setQuery(e.target.value);
            if(query === ""){
                setArrayQuery([]);
            } else if(query === " "){
                setArrayQuery([]);
            } else {
                const body = {name: "%" + capitalizeFirstLetter() + "%"}
                const response = await fetch("http://localhost:4000/searchbar", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                const data = await response.json();
                if(data.length === 0){
                    setText404("No items were found!");
                } else {
                    setText404("")
                }
                setArrayQuery(data);
            };
            
            
            props.getQuery(arrayQuery);
        } catch (err) {
            console.error(err.message);
        }
        
    };

    const getCategory = async() => {
        const result = await fetch("http://localhost:4000/categories/get");
        const data = await result.json();
        setCategories(data);
    };

    const checkBoxClick =  async(e) => {
        e.preventDefault();
        try {
            const params = e.target.value;
            const result = await fetch(`http://localhost:4000/searchbar/${params}`);
            const data = await result.json()
            console.log(data);
            props.getQuery(data);
        } catch (err) {
            console.error(err);
        }
    };



    
    useEffect(() => {
        checkUser();
        getCategory();
    });


   

    return (
        <Fragment>
            <br />
            <form style={{marginLeft: "3rem", height: "3rem"}} className="row">
                
                
                <div style={{display: "flex", gap: "1rem"}} className={hidden ? "col-md-11" : "col-md-8"}>
                    <input type="search" value={query} onChange={e => queryFunction(e)} className="border-secondary form-control" placeholder="Search for products. . ."/>
                </div>
                <div hidden={hidden} className="col-md-4">
                    <a href="/login"><p style={{marginRight: "1rem"}} className="btn btn-lg btn-outline-info">Login</p></a>
                    <a href="/register"><p className="btn btn-lg btn-info">Register</p></a>
                </div>
                
                <div className="col-md-12 row mb-3">
                    {categories.map((category) => (
                        <div className="col-md-2">
                            <button className="me-3 btn text-primary " value={category.category} onClick={e => checkBoxClick(e)} name={category.category}>{category.category}</button>
                        </div>
                    ))}
                   
                </div> 
            </form>
            
            <br />
            <p className="text-danger mt-3 mx-5" style={{position: "absolute"}}>{text404}</p>

        </Fragment>
    )
};

export default Searchbar;

