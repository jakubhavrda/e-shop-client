import React, {Fragment, useState, useEffect} from "react";
import Item from "./item"



function ItemDiscover(props) {
    
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(false);
    const query = props.query;

    
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
            
            <div hidden={!hidden} style={{margin: " 3rem 2rem",  display: "flex", flexWrap: "wrap", marginTop: "2rem"}}>
                {query.map((item, index) => (
                    <Item 
                        id={item.id}
                        key={index}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        color={item.color}
                        hidden={true}
                        className="col-lg-3"
                        width="18rem"
                        height="26rem"
                        imgHeight="18rem"
                    />
                ))}
            </div>
            <br></br>
            <div >
                <br></br>
                <div hidden={hidden} style={{margin: "0 2rem",  display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                    {items.map((item, index) => (
                        <Item
                        id={item.id}
                        key={index}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        color={item.color}
                        amount={item.amount}
                        hidden={true}
                        className="col-lg-3"
                        width="18rem"
                        height="26rem"
                        imgHeight="18rem"
                        />
                    ))}   
                </div>
            </div>
                


        </Fragment>
    );
};

export default ItemDiscover;