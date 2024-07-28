import React, {Fragment, useState, useEffect} from "react";
import Item from "./item";


function ItemDiscover(props) {
    
    const [items, setItems] = useState([]);
    const [mainImgs, setMainImgs] = useState([]);
    const [queryMainImgs, setQueryMainImgs] = useState([]);
    const [queryIsEmpty, setQueryIsEmpty] = useState(true);
    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(false);
    const query = props.query;
    const products = query.products;
    
    const checkQuery = () => {
        if(products.length > 0){
            setHidden(true);
            const images = query.images;
            setQueryIsEmpty(false)
            let imgArray = [];
            images.forEach((image, index) => {
                if(index % 4 === 0){
                    imgArray.push(image)
                } else if (index = 0) {
                    imgArray.push(image)
                };
                index++; 
            });
            setQueryMainImgs(imgArray);
        } else {
            setHidden(false);
            setQueryIsEmpty(true)
        };  
    };

    const getItems = async() => {
        const result = await fetch("http://localhost:4000/allProducts");
        const data = await result.json();
        const images = data.images;

        let imgArray = [];
        images.forEach((image, index) => {
            if(index % 4 === 0){
                imgArray.push(image)
            } else if (index = 0) {
                imgArray.push(image)
            };
            index++; 
        });

        setMainImgs(imgArray.reverse());
        setItems(data.products);
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
    }, [query])
    
    return (
        <Fragment>
            
            <div hidden={!hidden} style={{margin: " 3rem 2rem",  display: "flex", flexWrap: "wrap", marginTop: "2rem"}}>
                {products.map((item, index) => (
                    <Item 
                        id={item.id}
                        key={index}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        color={item.color}
                        hidden={true}
                        notInOrder={true}
                        imgSource={queryIsEmpty? {path: "images/products/duck3.png"} : queryMainImgs[index]} 
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
                        notInOrder={true}
                        imgSource={mainImgs[index]}
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