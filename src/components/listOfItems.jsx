import React, { Fragment, useEffect, useState } from "react";
import Item from "./item";
import subImg from "../images/sub-img.png"
import logo from "../images/logo.png"

function ListOfItems(){

    const [items, setItems] = useState([]);

    const getItems = async() => {
        const result = await fetch("http://localhost:4000")
        const data = await result.json()
        setItems(data);
    }

    useEffect(() => {
        getItems();
    }, []);
    return (
        <Fragment>
        <br />
        <img className="content-img" src={logo} alt="logo of &&" />
        <br />
        <br />
        <h1 id="newOffers">New Offers</h1>
        <div className="parent">
                {items.map((item, index) => (
                    <Item
                    key={index}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    color={item.color}
                    amount={item.amount}
                    hidden={true}
                    width="18rem"
                    height="26rem"
                    imgHeight="18rem"
                    />
                ))}   
            </div>
            <img className="content-img" src={subImg} alt="Promo of a certain Edition"/>
            <br />
        </Fragment>      
    )
};

export default ListOfItems;