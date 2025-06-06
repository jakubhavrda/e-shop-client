import React, {Fragment, useState} from "react";
import logo from "../../images/logo.png";
import packetaLogo from "../../images/packeta.png";
import dpdLogo from "../../images/dpd.png";
import balikovnaLogo from "../../images/balikova.jpg";
import bankTransfer from "../../images/bankTransfer.png";
import cardProviders from "../../images/cardProviders.png";
import Item from "../Item";
import { ToastContainer, toast } from "react-toastify";




const CheckoutPage = (props) => {
    const order = JSON.parse(localStorage.getItem("order"));
    const user = props.user;
    const data = order.order;
    const [details, setDetails] = useState({
        name: user.name, 
        email: user.email,
        phoneNumber: "",
        address: "",
        city: "",
        postalCode: "",
        shippingOption: null,
        paymentMethod: null,
    });
    const [card, setCard] = useState({
        cardNumber: "",
        expDate: "",
        cvc: ""
    })

    const {name, email, phoneNumber, address, city, postalCode, shippingOption, paymentMethod} = details;  //✔
    
    const mainImgs = order.mainImgs;
    
    const authorizeOrder = () => {
        if(props.user.id === data[0].user_id){
            if (data[0].paid === true){
                return true;
            } else {
                return false;
            };
        } else {
            return true;
        };
    };

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name] : e.target.value});
    };

    const onChange2 = (e) => {
        var checkboxes = document.getElementsByClassName("checkbox");
        for (let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked === true){
                if(checkboxes[i].defaultValue === e.target.value){
                    e.target.checked = true
                } else {
                    checkboxes[i].checked = false
                }
            };  
        };    
        setDetails({...details, ["shippingOption"] : e.target.value});     
    };


    const onChange3 = (e) => {
        var checkboxes = document.getElementsByClassName("paymentVariant");
        for (let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked === true){
                if(checkboxes[i].defaultValue === e.target.value){
                    e.target.checked = true
                } else {
                    checkboxes[i].checked = false
                }
            };  
        };
        setDetails({...details, ["paymentMethod"] : e.target.value})
    };

    const onChange4 = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(card.cardNumber.length > value.length && name === "cardNumber"){
            setCard({...card, [name]: value.substring(0, value.length - 1)});

        } else if(card.expDate.length > value.length && name === "expDate"){
            setCard({...card, [name]: value.substring(0, value.length -1)});

        } else {
            setCard({...card, [name]: value});
        }
        
    };

    const onSubmit1 = async(e) => {
        e.preventDefault();
        try {
            console.log(details);
        } catch (err) {
            console.error(err);
        }
    }; 

    const displayWidgets = () => {
        try {
            const shipping = details.shippingOption;
            console.log(shipping);
            
            if(shipping === "packeta"){
                // open packeta pick-up point!
                // https://configurator.widget.packeta.com/en

                const packetaApiKey = "ae5d575112911b43"
                const packetaOptions = {
                    country: "cz", 
                    language: "en", 
                    weight: " ", 
                    length: " ", 
                    width: " ", 
                    depth: " ", 
                    valueFormat: "\"Packeta\",id,carrierId,carrierPickupPointId,name,city,street", 
                    view: "modal", 
                    defaultCurrency: "CZK", 
                    defaultPrice: data[0].total_price
                };

                function showSelectedPickupPoint(point) {
                    const saveElement = document.querySelector(".packeta-selector-value");
                    // Add here an action on pickup point selection
                    saveElement.innerText = '';
                    if (point) {
                      console.log("Selected point", point);
                      saveElement.innerText = "Address: " + point.formatedValue; 
                    }
                }
                
                return <div style={{textAlign: "left"}}>
                            <button style={{ color: "#fff", backgroundColor: "#bc1a03", border: "#bc1a03"}} className="ms-4 mb-4">Select Pick Up Point <img style={{width: "40px"}} src={packetaLogo}></img></button>
                            <div class="packeta-selector-value"></div>
                        </div>
            } else if(shipping === "dpd"){
                // dpd
                // https://www.dpd.com/wp-content/uploads/sites/235/2023/04/DPD-API-documentation-v1-2-1.pdf 
            } else if(shipping === "balikovna"){
                // balíkovna
                // https://www.balikovna.cz/cs/partneri/e-shopy
            } else {

            }
            
        } catch (err) {
            console.error(err);
        }
    };

    const display4 = () => {
        if(paymentMethod === "Card Online"){

            if(card.cardNumber.length % 5 === 4){ 
                setCard({...card, ["cardNumber"]: card.cardNumber + " "})
            } 

            if(card.expDate.length === 2){
                setCard({...card, ["expDate"]: card.expDate + "/"});
            };
            
            
            return (
                    <form method="POST" action="/checkout" onSubmit={e => onSubmit4(e)}>
                        <label>Card Number</label>
                        <input type="text" name="cardNumber" value={card.cardNumber}  pattern="[0-9]*" inputmode="numeric" autocomplete="cc-number" maxLength="19" placeholder="0000 0000 0000 0000" required onChange={e => onChange4(e)}></input>
                        <label>CVC</label>
                        <input type="text" name="cvc" value={card.cvc} maxLength="3"  pattern="[0-9]*" inputMode="numeric" onChange={e => onChange4(e)}></input>
                        <label>Expiry Date</label>
                        <input type="text" name="expDate" value={card.expDate} maxLength="5"  pattern="[0-9]*" inputMode="numeric" className="mb-3" placeholder="MM/YY" onChange={e => onChange4(e)}></input>


                        <button type="sumbit" className="button-checkout-2">Sumbit Payment Method</button> 
                    </form>
            );
        } else if(paymentMethod === "Bank Transfer"){
            return(
                <div>
                    <h6 className="mt-3">Please Send Amount of Total Price To Bank Account Below</h6>
                    <h4 className="bank-number">2373237018/3030</h4>
                    <p>While paying insert your email: <u className="text-primary">{email}</u> in the note section.</p>
                    <p><span className="text-primary">{name}'s</span> order will be approved on the next workday.</p>
                </div>
            );  
        } else {
            return(
                <div>
                    <h5 className="my-4">Select Payment Method First!</h5>
                </div>
            ); 
            
        }
    }

    const onSubmit4 = async(e) => {
        e.preventDefault();
        try {
            
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <Fragment>
            <a href="/"><img src={logo} className="mt-4" style={{width: "10rem" }} alt="DAMP"/></a>
                    
            {data.map((x) => (
                <div className="row justify-content-center">
                    <h3 className="name-cart">{user.name}'s Cart!</h3>
                    <div className="row justify-content-center">
                         {x.list_of_items.map((item, index) => (
                        <Item
                            key={index} 
                            id={item.id}   
                            name={item.name}
                            color={item.color}
                            price={item.price}
                            amount={item.amount}
                            notInOrder={false}
                            hidden={authorizeOrder()}
                            editOrder={props.editOrder}
                            imgSource={mainImgs[index]}
                            className="col-lg-6"
                            width="15rem"
                            height="22rem"
                            imgHeight="15rem"
                        />
                    ))}
                    </div>
                   
                </div>
                
            ))}
            <hr></hr>
            <h4> Total Price: <i className="text-primary">{data[0].total_price} ,-</i></h4>
           
            <div className="grid-checkout">
                <div id="contact-details">
                <form method="POST" action="/checkout" onSubmit={e => onSubmit1(e)}>
                    <h3 className="left font-and-color">Contact Details</h3>
                    <label>Name:</label>
                    <input type="text" name="name" value={details.name} onChange={e => onChange(e)}></input>
                    <label>E-Mail:</label>
                    <input type="text" name="email" value={details.email} onChange={e => onChange(e)}></input>
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={details.phoneNumber} onChange={e => onChange(e)}></input>
                    <label>Address:</label>
                    <input type="text" name="address" value={details.address} onChange={e => onChange(e)}></input>
                    <label>City:</label>
                    <input type="text" name="city" value={details.city} onChange={e => onChange(e)}></input>
                    <label>Postal Code:</label>
                    <input type="text" name="postalCode" value={details.postalCode} onChange={e => onChange(e)}></input>
                    <button type="sumbit" className=" button-checkout">Submit Details</button>
                </form>     
                </div>
                <div id="shipping-option">
                    <form  method="POST" action="/checkout">
                        <h3 className="left font-and-color">Shipping option</h3>
                    
                        <div className="option-for-shipping" >

                                <div class="checkbox-wrapper-31 packeta-selector-open" >
                                    <input type="checkbox" class="checkbox" value="packeta" onChange={e => onChange2(e)}/> 
                                    <svg viewBox="0 0 35.6 35.6">
                                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                     </svg>
                                </div>

                            <h5>Packeta</h5>
                            <img src={packetaLogo} />   
                            <div class="packeta-selector-value"></div>  
                        </div>
      

                        <div className="option-for-shipping">
                            <div class="checkbox-wrapper-31">
                            <input type="checkbox" class="checkbox" value="dpd" onChange={e => onChange2(e)}/>
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                 </svg>
                            </div>
                            <h5>DPD</h5>
                            <img src={dpdLogo} /> 
                        </div>

                        <div className="option-for-shipping mb-3">
                            <div class="checkbox-wrapper-31">
                            <input type="checkbox" class="checkbox" value="balikovna" onChange={e => onChange2(e)}/>
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                 </svg>
                            </div>
                            <h5>Balikovna</h5>
                            <img src={balikovnaLogo} /> 
                        </div>
                        {displayWidgets()}
            
                    </form>
                </div>
                <div id="payment-option">
                <h3 className="left font-and-color">Payment Option</h3>
                    <form method="POST" action="/checkout">
                        <div className="option-for-shipping mt-3">
                            <div class="checkbox-wrapper-31">
                            <input type="checkbox" class="paymentVariant" value="Card Online" onChange={e => onChange3(e)}/>
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                 </svg>
                            </div>
                            <h5>VISA / Mastercard</h5>
                            <img id="visa" src={cardProviders} /> 
                        </div>
                        <div className="option-for-shipping mb-3">
                            <div class="checkbox-wrapper-31">
                            <input type="checkbox" class="paymentVariant" value="Bank Transfer" onChange={e => onChange3(e)}/>
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                 </svg>
                            </div>
                            <h5>Bank Transfer</h5>
                            <img src={bankTransfer} /> 
                        </div>
                    </form>
                
                </div>
                <div id="card-details">
                    <h3 className="left font-and-color">Card Details</h3>
                    {display4()}
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default CheckoutPage;

// PLAN!

// step.1
// display cart 
// --->>> products, total price   ✔

// step.2
// collect contact information
// --->>> email, phone number (+ country number)

// step.3
// collect shipping data
// --->>> country/region, first name, last name, address, appartment, postal code, city
// + shipping method
// zásilkovna API
// https://docs.packetery.com/

//step.4 
// collect payment data and sent to payment gateway
// --->>> payment method options, CVC code, Exp. date, card number, card owner

//step.5 
// thank you page redirect
// --->>> downloadable PDF file, confirmation email, email to the seller
// + order status emails, order status on ordersPage

