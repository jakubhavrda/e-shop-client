import React, { Fragment } from "react";
import OneItem from "../OneItem";
import Navbar from "../navbar";



function SingleItemPage({user}) {

    return (
        <Fragment>  
                <Navbar user={user}/> 
                <OneItem />   
        </Fragment>
        
    )
};

export default SingleItemPage;