import React, { Fragment, useState, useEffect } from "react";
import AllItems from "../allItems";
import Categories from "../Categories";
import logo from "../../images/logo.png";
//const multer = require("multer");
//const storage = multer.memoryStorage();
//const upload = multer({storage: storage, dest: 'uploads/'});

function AdminPage({user}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("X");
    const [inStock, setInStock] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const images = [];
    
    const [categories, setCategories] = useState([]);

    const getCategory = async() => {
        const result = await fetch("http://localhost:4000/categories/get");
        const data = await result.json();
        setCategories(data);
    };

    

    const createItem = async(e) => {
        e.preventDefault();
        try {
            const body = [name, price, category, inStock, color, description];
            
            
            // images array includes 4 filepaths
            //no idea how to transfer to multer ! ... req.files?
            console.log(images);

    

            //const result = fetch("http://localhost:4000/admin/create",{
            //    method: "POST",
            //    headers: { "Content-Type": "application/json" },
            //    body: JSON.stringify(body)
            //});
            //window.location = "/admin"
        } catch (err) {
            console.error(err);
        }

    };

    useEffect(() => {
        getCategory();
    }, []);


    return (
        <Fragment>
            <a href="/"><img src={logo} className="my-4" style={{width: "40%" }} alt="DAMP"/></a>
            <h2 className="my-3 text-danger">This is an Admin-Only Site!</h2>
            <div className="mx-5 ">
                <a href="/"><button>Shop</button></a>
                <a href="/admin/orders"><button>Manage Orders</button></a>
            </div>
            <form method="POST" action="/admin/create"
                enctype="multipart/form-data"
                style={{ margin: "2rem", border: "solid 2px", padding: "1rem"}}
                onSubmit={createItem}>
            
            <h2>Display a product</h2>
            <div style={{display: "flex",justifyContent: "space-around"}}>
                <div style={{width: "30%", display: "inline-block"}}>
               
                    <label className="form-label">Name:</label>
                    <input className="form-control border-success" type="text" name="name" value={name} onChange={e => setName(e.target.value)}></input>
                        <br/>
                    <label className="form-label">Price:</label>
                    <input className="form-control border-success" type="number" name="price" value={price} onChange={e => setPrice(e.target.value)}></input>
                        <br/>
                    <label className="form-label">Category:</label>
                    <select className="form-select border-success" aria-label="Select Category" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="default">Default</option>
                        {categories.map((item) => (
                            <option key={item.ctgr_id} value={item.category}>{item.category}</option>
                          ))}
                      
                    </select>
                        <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </div>
                <div style={{width: "30%", display: "inline-block"}}>

                    <label className="form-label">In_Stock:</label>
                        <input className="form-control border-success" type="number" name="inStock" value={inStock} onChange={e => setInStock(e.target.value)}></input>
                    <label className="form-label">Images:</label>
                    
                    
                    
                    <input className="form-control border-success" type="file" accept="image/jpg, image/jpeg, image/png" name="image" onChange={e => images.push(e.target.value)}></input>
                    <input className="form-control border-success" type="file" accept="image/jpg, image/jpeg, image/png" name="image" onChange={e => images.push(e.target.value)}></input>
                    <input className="form-control border-success" type="file" accept="image/jpg, image/jpeg, image/png" name="image" onChange={e => images.push(e.target.value)}></input>
                    <input className="form-control border-success" type="file" accept="image/jpg, image/jpeg, image/png" name="image" onChange={e => images.push(e.target.value)}></input>
                    


                        <br/>
                    <label className="form-label">Color:</label>
                    <input type="text" className="form-control border-success" name="color" value={color}  onChange={e => setColor(e.target.value)}/>
                        <br/>
                    
                </div>
                <div style={{width: "30%", display: "inline-block"}}>
                        <label className="form-label">Description, maximum of 700 characters</label>
                        <textarea maxLength="700" rows="11" className="form-control border-success" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
            </div>
                
                
                
            </form>

            
            <div style={{margin: "2rem", border: "solid 2px", padding: "1rem"}}>
            <h2>All products</h2>
            <AllItems  />
            </div>
            <Categories />


        </Fragment>

    )
};

export default AdminPage;