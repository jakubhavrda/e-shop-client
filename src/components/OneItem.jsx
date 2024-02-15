import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function OneItem() {

    const [item, setItem] = useState([]);
    const params = useParams();

    const getSingleItem = async() => {
        const result = await fetch(`http://localhost:4000/discover/${params.category}/${params.itemId}`);
        const data = await result.json();
        setItem(data)
    };

    const addToCart = async() => {
        console.log("Clicked");
    };




    useEffect(() => {
        getSingleItem();
    }, []);

    return(
        <Fragment>
            {item.map(item => (
                <div style={{display: "flex", justifyContent: "center", gap: "2rem", margin: "2rem 5rem", textAlign: "center"}}>
                    <div style={{border: "solid", borderRadius: "10px"}} className="border-secondary">
                        <h1>{item.name}</h1>
                        <h3 style={{color: "#ff0800"}}>{item.price} CZK</h3>
                        <p>{item.category}</p>
                        <img style={{height: "30rem", borderTop: "solid 0.5rem",borderTopColor: item.color, marginBottom: "2px"}} src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c3be8ab1-9281-41db-a54a-abe3df27a8d3/dri-fit-hwpo-training-t-shirt-S6zK5k.png"></img>
                    </div>
                    <div style={{width: "40rem", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", textAlign: "left"}}>
                        <p>{item.description}</p>
                        <button className="btn btn-lg btn-success" onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>      

            ))}
        </Fragment>
    );
};

export default OneItem;