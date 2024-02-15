import React from "react";
import { useParams } from "react-router-dom";
import kolo from "../images/products/kolo.jpg"

function Item(props){

  const { itemId } = useParams(props.id);
  const { category } = useParams(props.category);

    return(
        <div id={props.id} className="card" style={{width: "18rem", height: "26rem"}}>
          <a href={"/discover/"+ props.category + "/" + props.id}>
            <img src={kolo} className="card-img-top" alt={props.name} style={{borderBottomColor: props.color, height: "18rem"}}/>
            <div className="card-body">
              <h4 className="card-title">{props.name}</h4>
              <h6 className="cart-subtitle">{props.category}</h6>
              <h3 className="card-title">{props.price} kč</h3>
            </div>
          </a>
        </div>
        
    )
};



export default Item;
