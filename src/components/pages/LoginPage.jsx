
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../images/logo.png";


function LoginPage({ setAuth }) {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name] : e.target.value })
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true)
                toast.success("login was successful");
            } else {
                setAuth(false)
                toast.error(parseRes);
            };

        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <Fragment>
            <a href="/"><img src={logo} className="mt-5" style={{width: "20rem" }} alt="&& logo"/></a>
            <h1 className="my-5">Login</h1>
            <Link to="/register" className="text-primary fst-italic">Don't have an account? Click Here!</Link>
            
            <form className="mx-5 px-5 mb-5 row" onSubmit={onSubmit}>
                <div className="col-lg-6 col-md-12">
                    <label className="mt-3">Email:</label>
                    <input type="email" name="email" value={email} onChange={e => onChange(e)} className="form-control border-success" />
                </div>
                <div className="col-lg-6 col-md-12">
                    <label className="mt-3">Password:</label>
                    <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control border-success" />
                </div>
                <div className="my-3">
                    <button type="submit" className="mx-5 btn btn-success">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </Fragment>
        
    );
};

export default LoginPage;
