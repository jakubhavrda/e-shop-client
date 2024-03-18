import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar";
import ListOfItems from "../listOfItems";
import Searchbar from "../Searchbar";
import ItemDiscover from "../ItemDiscover";

function HomePage(props) {
    const user = props.user;
    const order = props.order;

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
            <Navbar user={user} order={order} editOrder={props.editOrder}/>
            <Searchbar user={user} getQuery={getQuery}/>
            <div hidden={hidden}>
                <ItemDiscover query={arrayQuery}/>
            </div>
            
            <ListOfItems />
            <ItemDiscover query={[]}/>
        </Fragment>
    )
};

export default HomePage;