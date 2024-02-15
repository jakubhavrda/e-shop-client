import React, { Fragment } from "react";
import Navbar from "../navbar";
import ListOfItems from "../listOfItems";
import Searchbar from "../Searchbar";

function HomePage({user}) {

    return(
        <Fragment>
            <Navbar user={user}/>
            <Searchbar user={user}/>
            <ListOfItems />
        </Fragment>
    )
};

export default HomePage;