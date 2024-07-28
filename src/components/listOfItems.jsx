import React, { Fragment, useEffect, useState } from "react";
import Item from "./item";
import subImg from "../images/duck_sub_img.png"
import duck_background from "../images/duck_background.png"

function ListOfItems(){

    const [items, setItems] = useState([]);
    const [mainImgs, setMainImgs] = useState([]);

    const getItems = async() => {
        const result = await fetch("http://localhost:4000/");
        const data = await result.json();
        const images = data.images;
        setMainImgs([images[8], images[4], images[0]]);
        setItems(data.products);
    };

 

    useEffect(() => {
        getItems();
    }, []);
    return (
        <Fragment>
        <br />
        <img className="content-img" src={duck_background} alt="logo of &&" />
        <br />
        <br />
        <h1 id="newOffers">New Offers</h1>
        <div className="newOffersParent">
                {items.map((item, index) => (
                    <Item
                    key={index}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    color={item.color}
                    amount={item.amount}
                    notInOrder={true}
                    hidden={true}
                    width="18rem"
                    height="26rem"
                    imgHeight="18rem"
                    imgSource={mainImgs[index]}
                    />
                ))}   
            </div>
            <img className="content-img" src={subImg} alt="Promo of a certain Edition"/>
            <br />
        </Fragment>      
    )
};

export default ListOfItems;