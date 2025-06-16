import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./app";
import "../styles.css";

function OneItem() {
  const [item, setItem] = useState([]);
  const [images, setImages] = useState([]);
  const params = useParams();

  const order = useContext(UserContext);
  const user_id = useContext(UserContext).user.id;

  const [mainImg, setMainImg] = useState(0);
  const [otherImgs, setOtherImgs] = useState([1, 2, 3]);

  const getSingleItem = async () => {
    const result = await fetch(
      `http://localhost:4000/discover/${params.category}/${params.itemId}`
    );
    const data = await result.json();
    setItem(data.product);
    setImages(data.images);
  };

  const createOrder = async () => {
    try {
      let list_of_items = [];
      if (order.length === 0) {
        list_of_items = item;
      } else {
        order[0].list_of_items.push(item[0]);
        list_of_items = order[0].list_of_items;
      }
      const body = { list_of_items, user_id };
      console.log(body);
      const response = await fetch("http://localhost:4000/createOrEditOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  const changeImage = (index) => {
    let numbers = [1, 2, 3];
    let imgArray = [];
    numbers.forEach((num) => {
      if (num === index) {
        imgArray.push(0);
      } else {
        imgArray.push(num);
      }
    });
    setMainImg(index);
    setOtherImgs(imgArray);
  };

  useEffect(() => {
    getSingleItem();
  }, []);

  return (
    <Fragment>
      <hr />
      {item.map((item, index) => (
        <div id={index} className="singleItemParent" key={index}>
          <div className="singleItemCard">
            <h1>{item.name}</h1>
            <h3 style={{ color: "#ff0800" }}>{item.price} CZK</h3>
            <p>{item.category}</p>
            <img
              className="siMainPic"
              style={{ borderTopColor: item.color }}
              src={require("../" + images[mainImg].path)}
            ></img>
          </div>
          <div className="singleItemPictures">
            <div onClick={(e) => changeImage(otherImgs[0])}>
              <img
                className="siPic"
                src={require("../" + images[otherImgs[0]].path)}
              ></img>
            </div>
            <div onClick={(e) => changeImage(otherImgs[1])}>
              <img
                className="siPic"
                src={require("../" + images[otherImgs[1]].path)}
              ></img>
            </div>
            <div onClick={(e) => changeImage(otherImgs[2])}>
              <img
                className="siPic"
                src={require("../" + images[otherImgs[2]].path)}
              ></img>
            </div>
          </div>
          <div className="singleItemText">
            <p>{item.description}</p>
            <button className="btn btn-lg btn-success" onClick={createOrder}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default OneItem;
