import { Fragment } from "react";
import OneItem from "../OneItem";
import Navbar from "../Navbar";

function SingleItemPage(props) {
  return (
    <Fragment>
      <Navbar order={props.order} editOrder={props.editOrder} />
      <OneItem order={props.order} />
    </Fragment>
  );
}

export default SingleItemPage;
