import { Fragment } from "react";
import OneItem from "../OneItem";
import Navbar from "../Navbar";

function SingleItemPage(props) {
  return (
    <Fragment>
      <Navbar editOrder={props.editOrder} />
      <OneItem />
    </Fragment>
  );
}

export default SingleItemPage;
