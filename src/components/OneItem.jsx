import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function OneItem(props) {

    const [item, setItem] = useState([]);
    const [images, setImages] = useState([]);
    const params = useParams();
    const order = props.order;
    console.log(order);
    console.log(item);

    const getSingleItem = async() => {
        const result = await fetch(`http://localhost:4000/discover/${params.category}/${params.itemId}`);
        const data = await result.json();
        setItem(data.product);
        setImages(data.images);
    };



    const createOrder = async() => {
        try {
            let list_of_items = [];
            if(!order) {
               list_of_items = item;
            } else {
                order[0].list_of_items.push(item[0]);
                list_of_items = order[0].list_of_items;
            }
            const user_id = props.user.id;  
            const body = {list_of_items, user_id};
            const response = await fetch("http://localhost:4000/createOrEditOrder", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
              });
            const parseRes = await response.json();
            console.log(parseRes);     
        } catch (err) {
          console.error(err.message);
        }
      };




    useEffect(() => {
        getSingleItem();
    }, []);

    return(
        <Fragment>
            <hr />
            {item.map((item, index) => (
                <div id={index} className="singleItemParent">
                    
                    <div className="singleItemCard" > 
                        <h1>{item.name}</h1>
                        <h3 style={{color: "#ff0800"}}>{item.price} CZK</h3>
                        <p>{item.category}</p>
                        <img className="siMainPic" style={{borderTopColor: item.color}} src={require("../"+ images[0].path)}></img>
                    </div>
                    <div className="singleItemPictures">
                        <div><img className="siPic" src={require("../"+ images[1].path)}></img></div>
                        <div><img className="siPic" src={require("../"+ images[2].path)}></img></div>
                        <div><img className="siPic" src={require("../"+ images[3].path)}></img></div>
                    </div>
                    <div className="singleItemText">
                        <p>{item.description}</p>
                        <button className="btn btn-lg btn-success" onClick={createOrder}>Add to Cart</button>
                    </div>
                </div>      

            ))}
        </Fragment>
    );
};

export default OneItem;