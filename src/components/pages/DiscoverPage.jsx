import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar";
import Searchbar from "../Searchbar";
import ItemDiscover from "../ItemDiscover";

function DiscoverPage({user}) {

    const [arrayQuery, setArrayQuery] = useState([]);

    const getQuery = (query) => {
        setArrayQuery(query);
    };

    return (
        <Fragment>
            <Navbar user={user}/>
            <hr />
            <h1>Discover <i className="fa-solid fa-rocket "></i></h1>
            <Searchbar user={user} getQuery={getQuery}/>
            <ItemDiscover query={arrayQuery}/>
        </Fragment>
        
    );
};

export default DiscoverPage;
