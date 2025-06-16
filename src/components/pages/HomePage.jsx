import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar";
import ListOfItems from "../ListOfItems";
import Searchbar from "../Searchbar";
import ItemDiscover from "../ItemDiscover";

function HomePage(props) {
  const order = props.order;

  const [arrayQuery, setArrayQuery] = useState({ products: [], images: [] });
  const [hidden, setHidden] = useState(true);

  const getQuery = (query) => {
    setArrayQuery(query);
  };

  const checkQuery = () => {
    const products = arrayQuery.products;
    if (products.length > 0) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  useEffect(() => {
    checkQuery();
  });

  return (
    <Fragment>
      <Navbar editOrder={props.editOrder} />
      <Searchbar getQuery={getQuery} />
      <div hidden={hidden}>
        <ItemDiscover query={arrayQuery} />
      </div>
      <ListOfItems />
      <ItemDiscover query={{ products: [], images: [] }} />
    </Fragment>
  );
}

export default HomePage;
