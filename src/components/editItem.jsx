import React, { Fragment, useState, useEffect } from "react";

const EditItem = (props) => {

    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [category, setCategory] = useState(props.category);
    const [inStock, setInStock] = useState(props.in_stock);
    const [color, setColor] = useState(props.color);
    const [description, setDescription] = useState(props.description);

    const [categories, setCategories] = useState([]);

    const getCategory = async() => {
      const result = await fetch("http://localhost:4000/categories/get");
      const data = await result.json();
      setCategories(data);
    };

    const editItem = async(e) => {
     
        e.preventDefault();
        try {
            const body = [name, price, category, inStock, color, description];
            console.log(body);
            const result = await fetch(`http://localhost:4000/admin/put/${props.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });
            console.log(result);
            window.location ="/";
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
      getCategory();
    }, []);

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${props.id}`} >              
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <div className="modal" id={`id${props.id}`}>
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">Edit Item</h4>
                    <button type="button" className="close" data-bs-dismiss="modal" onClick={() => {
                      setName(props.name) 
                      setPrice(props.price)
                      setCategory(props.category)
                      setInStock(props.in_stock)
                      setColor(props.color)
                      setDescription(props.description)
                    }}>&times;</button>
                  </div>

                  <div className="modal-body">
                    <label>Name</label>
                    <input type="text" className="form-control border-danger" value={name} onChange={e => {setName(e.target.value)}}/>
                    <label>Price</label>
                    <input type="number" className="form-control border-danger" value={price} onChange={e => {setPrice(e.target.value)}}/>
                    <label>Category</label>
                    <select className="form-select border-danger" aria-label="Select Category" value={category} onChange={e => {setCategory(e.target.value)}}>
                    {categories.map((item) => (
                            <option key={item.ctgr_id} value={item.category}>{item.category}</option>
                          ))}
                    </select>
                    <label>In Stock</label>
                    <input type="number" className="form-control border-danger" value={inStock} onChange={e => {setInStock(e.target.value)}}/>
                    <label>Color</label>
                    <input type="text" className="form-control border-danger" value={color} onChange={e => {setColor(e.target.value)}}/>
                    <label className="form-label">Description, maximum of 700 characters</label>
                    <textarea maxLength="300" rows="10" className="form-control border-danger" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => editItem(e)}>Edit</button>                    
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() =>{
                      setName(props.name)
                      setPrice(props.price)
                      setCategory(props.category)
                      setInStock(props.in_stock)
                      setColor(props.color)
                      setDescription(props.description)
                    }}>
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </div>
        </Fragment>
    );
};

export default EditItem;