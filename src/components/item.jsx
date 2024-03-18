import React, {useState} from "react";
import { useParams } from "react-router-dom";
import kolo from "../images/products/kolo.jpg"

function Item(props){

  const { itemId } = useParams(props.id);
  const { category } = useParams(props.category);

  const [amount, setAmount] = useState(props.amount);

  const addAmount = () => { 
    if(amount === props.in_stock){
      setAmount(amount);
    } else {
      setAmount(amount + 1);
    }
    props.editOrder({amount, id: props.id});
  };

  const minusAmount = () => {
    setAmount(amount - 1);
    props.editOrder({amount, id: props.id});
  };

    return(
        <div id={props.id} className="card" style={{width: props.width, height: props.height}}>
          <a href={"/discover/"+ props.category + "/" + props.id}>
            <img src={kolo} className="card-img-top" alt={props.name} style={{borderBottomColor: props.color, height: props.imgHeight}}/>
           </a>
            <div className="card-body d-flex justify-content-between">
              <div>
                <h4 className="card-title">{props.name}</h4>
                <h6 className="cart-subtitle">{props.category}</h6>
                <h3 className="card-title">{props.price} kč</h3>
              </div>
              <div className="text-center" hidden={props.hidden}>
                <h6 onClick={addAmount} className="border border-dark bg-light p-1 m-0">+</h6>
                <h6 className="border border-dark bg-light p-1 m-0" value={amount}>{amount}</h6>
                <h6 onClick={minusAmount} className="border border-dark bg-light p-1 m-0">-</h6>
              </div>
            </div>
         
        </div>
        
    )
};



export default Item;
