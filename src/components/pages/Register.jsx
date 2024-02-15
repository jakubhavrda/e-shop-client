import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../images/logo.png";


function Register({ setAuth }) {
    
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        password: ""
    });

    const {email, name, password} = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name] : e.target.value});
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await fetch("http://localhost:4000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("registered successfully!")
            } else {
                setAuth(false);
                toast.error(parseRes);
            };

        } catch (err) {
            console.error(err.message);
        }
    };
    
    return (
        <Fragment>
            <a href="/"><img src={logo} className="mt-5" style={{width: "20rem"}} alt="&& logo"/></a>
            
            <h1 className="my-4">Register</h1>
            <Link to="/login" className="text-primary fst-italic">Already have an account? Click Login</Link>
           
            <form className="mx-5 mb-5 px-5 row" onSubmit={onSubmit}>
             
                <div className="col-md-6">
                   <label className="mt-3 form-label">E-mail:</label>
                    <input type="email" name="email" value={email} onChange={e => onChange(e)} className="form-control border-success"/> 
                </div>
                <div className="col-md-6">
                    <label className="mt-3 form-label">Username:</label>
                    <input type="text" name="name" value={name} onChange={e => onChange(e)} className="form-control border-success"/>
                </div>
                <div className="col-md-6">
                    <label className="mt-3 form-label">Password: </label>
                    <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control border-success"/>
                    
                </div>
                <div className="col-md-6">
                    <label className="mt-3 form-label">Date of Birth:</label>
                    <input type="date" name="password" value="" className="form-control border-success"/>
                </div>
                
                <div className="my-5">
                    <button type="submit" className="mx-5 btn btn-success btn-lg">Submit</button>
                </div>
                
            </form>
            <ToastContainer />
        </Fragment>
    );
};

export default Register;
