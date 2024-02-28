import React, { Fragment } from "react";
import OneItem from "../OneItem";
import Navbar from "../navbar";



function SingleItemPage(props) {
    const user = props.user;
    return (
        <Fragment>  
                <Navbar user={user}/> 
                <OneItem order={props.order}/>   
        </Fragment>
        
    )
};

export default SingleItemPage;



