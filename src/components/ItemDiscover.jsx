import React, {Fragment, useState, useEffect} from "react";
import Item from "./item"



function ItemDiscover(props) {
    
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(false);
    const query = props.query;

    console.log(query.length);
    console.log(query);
    
    const checkQuery = () => {
        if(query.length > 0){
            setHidden(true);
        } else {
            setHidden(false);
        };  
    };
     
    
    

    const getItems = async() => {
        const result = await fetch("http://localhost:4000/allProducts")
        const data = await result.json()
        setItems(data);
    };

    const getCategory = async() => {
        const result = await fetch("http://localhost:4000/categories/get");
        const data = await result.json();
        setCategories(data);
    };


    useEffect(() => {
        getItems();
        getCategory();
        
    },[]);

    useEffect(() => {
        checkQuery();
    })
    
    return (
        <Fragment>
            <div hidden={!hidden} style={{margin: "0 2rem",  display: "flex", flexWrap: "wrap"}}>
                {query.map((item, index) => (
                    <Item 
                        id={item.id}
                        key={index}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        color={item.color}
                        className="col-lg-3"
                    />
                ))}
            </div>
            <br></br>
            {categories.map((category) => (
                <div hidden={hidden} id={category.category}>
                    <hr></hr>
                    <div key={category.ctgr_id} style={{marginLeft: "3rem", display: "flex"}}>
                        <h3 style={{float: "left"}}>{category.category}</h3>
                        <br></br>
                    </div>
                    <br></br>
                    <div style={{margin: "0 2rem",  display: "flex", flexWrap: "wrap"}}>
                        {items.filter(item => item.category === category.category).map((item, index) => (
                            <Item
                            id={item.id}
                            key={index}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                            color={item.color}
                            className="col-lg-3"

                            />
                        ))}   
                    </div>
                </div>
                
            ))}

        </Fragment>
    );
};

export default ItemDiscover;