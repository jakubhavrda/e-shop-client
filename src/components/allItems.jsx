import React, { Fragment, useEffect, useState } from "react";
import EditItem from "./editItem";


function AllItems() {
    
    const [items, setItems] = useState([]);

    
    const getItems = async() => {
        const result = await fetch("http://localhost:4000/allProducts")
        const data = await result.json()
        setItems(data);
    };
    
    const deleteItem = async(id) => {
        try{
            const result = await fetch(`http://localhost:4000/admin/delete/${id}`, {
                    method: "DELETE"
                });
            console.log(result);
            setItems(items.filter(item => item.id !== id));
        }catch(err){
            console.error(err);
        }
       
        
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Fragment>
        <div className="allItems">
            {items.map((item, index) => (
                <div style={{margin: "2rem", border: "solid 2px", padding: "1rem"}}>
                    <p key={index}>id: {item.id}</p>
                    <h4>Name: {item.name}</h4>
                    <p>Category: {item.category}</p>
                    <h5>Price: {item.price} CZK</h5>
                    <p>Color: {item.color}</p>
                    <p>Stock: {item.in_stock}</p>
                
                    <div style={{display: "flex", justifyContent: "space-evenly"}}>
                        <EditItem 
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            category={item.category}
                            in_stock={item.in_stock}
                            color={item.color}
                            description={item.description}
                            />
                        <button className="btn btn-danger" onClick={() => {deleteItem(item.id)}}><i className="fa-solid fa-trash-can"></i></button>
                    </div>


                  
                </div>

            )
            )}
             
            </div>

        <p>(note: You cannot edit image files. Proceed to delete an item or service.)</p>
        </Fragment>      
    )
};

export default AllItems;