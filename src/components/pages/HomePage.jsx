import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar";
import ListOfItems from "../listOfItems";
import Searchbar from "../Searchbar";
import ItemDiscover from "../ItemDiscover";

function HomePage({user}) {

    const [arrayQuery, setArrayQuery] = useState([]);
    const [hidden, setHidden] = useState(true);

    const getQuery = (query) => {
        setArrayQuery(query);
    };

    const checkQuery = () => {
        if(arrayQuery.length > 0){
            setHidden(false);
        } else {
            setHidden(true)
        }
    }

    useEffect(() => {
        checkQuery();
    })

    return(
        <Fragment>
            <Navbar user={user}/>
            <Searchbar user={user} getQuery={getQuery}/>
            <div hidden={hidden}>
                <ItemDiscover query={arrayQuery}/>
            </div>
            
            <ListOfItems />
        </Fragment>
    )
};

export default HomePage;