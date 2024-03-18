import React, { Fragment } from "react";
import OneItem from "../OneItem";
import Navbar from "../navbar";



function SingleItemPage(props) {
    const user = props.user;
    return (
        <Fragment>  
                <Navbar user={user} order={props.order} editOrder={props.editOrder}/> 
                <OneItem user={user} />   
        </Fragment>
        
    )
};

export default SingleItemPage;



