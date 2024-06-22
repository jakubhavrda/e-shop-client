import React, {Fragment, useState, useEffect} from "react";

function Categories(){
 
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    
    const getCategory = async() => {
        const result = await fetch("http://localhost:4000/categories/get");
        const data = await result.json();
        setCategories(data);
    };

    const createCategory = async(e) => {
        e.preventDefault();
        try {
            const body = [category];
            const result = fetch("http://localhost:4000/categories/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/admin";
        } catch (err) {
            console.error(err);
        };
       
    };

    const deleteCategory = async(id) => {
        try{
            const result = await fetch(`http://localhost:4000/categories/delete/${id}`, {
                    method: "DELETE"
                });
            console.log(result);
            setCategories(categories.filter(item => item.ctgr_id !== id));
        }catch(err){
            console.error(err);
        };
    };


    useEffect(() => {
        getCategory();
    }, []);

    return (
        <Fragment>
            <div style={{margin: "2rem", border: "solid 2px", padding: "1rem", width: "60%"}}>
                <h3>Categories</h3>
                <table className="table mt-5 text-center">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {categories.map((item) => (
                        <tr key={item.ctgr_id}>
                            <td>{item.category}</td>
                            <td><button className="btn btn-danger" onClick={() => {deleteCategory(item.ctgr_id)}}><i className="fa-solid fa-trash-can"></i></button></td>
                        </tr>               
                    ))}
                    </tbody>
                </table>
                
                <form method="POST" action="/categories/create" onSubmit={createCategory}>
                    <label className="form-label" style={{display: "block"}}>Add Category</label>
                    <input value={category} onChange={e => setCategory(e.target.value)} type="text" className="form-control border-success" style={{width: "80%", display: "inline-block"}}></input>
                    <button type="submit" className="btn btn-success" style={{marginBottom: "5px", marginLeft: "0.3rem"}}>Add</button>
                </form>
                   
            </div>
        </Fragment>
    );
};

export default Categories;