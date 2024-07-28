import React, {useState} from "react";
import { useParams } from "react-router-dom";
import duck_img from "../images/products/duck3.png";



function Item(props){

  const { itemId } = useParams(props.id);
  const { category } = useParams(props.category);

  const [itemAmount, setAmount] = useState(props.amount);
  const addAmount = () => { 
    if(itemAmount === props.in_stock){
      setAmount(itemAmount);
    } else {
      setAmount(itemAmount + 1);
    }
    var amount = itemAmount + 1;
    props.editOrder({amount, id: props.id});
  };

  const minusAmount = () => {
    setAmount(itemAmount - 1);
    var amount = itemAmount - 1;
    props.editOrder({amount, id: props.id});
  };

    return(
        <div id={props.id} className="card" style={{width: props.width, height: props.height}}>
          <a href={"/discover/"+ props.category + "/" + props.id}>
            <img src={require("../"+ props.imgSource.path)} className="card-img-top" alt={props.name} style={{borderBottomColor: props.color, height: props.imgHeight}}/>
           </a>
            <div className="card-body d-flex justify-content-between">
              <div>
                <h4 className="card-title">{props.name}</h4>
                <h6 className="cart-subtitle">{props.category}</h6>
                <h3 className="card-title">{props.price} kč</h3>
              </div>
              <div className="text-center">
                <h6 onClick={addAmount} hidden={props.hidden} className="border border-dark bg-light p-1 m-0">+</h6>
                <h6 className="border border-dark bg-light p-1 m-0" hidden={props.notInOrder} value={itemAmount}>{itemAmount}</h6>
                <h6 onClick={minusAmount} hidden={props.hidden} className="border border-dark bg-light p-1 m-0">-</h6>
              </div>
            </div>
         
        </div>
        
    )
};



export default Item;
