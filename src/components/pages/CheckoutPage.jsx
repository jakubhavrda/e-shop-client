import React, {Fragment, useState} from "react";
import logo from "../../images/logo.png";
import packetaLogo from "../../images/packeta.png";
import Item from "../item";

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
        postalCode: ""
    });

    
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
        details[e.target.name] = e.target.value; // solution to adding specific values to specific properties
    };


    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log(details);
            
        } catch (err) {
            console.error(err);
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
            <form method="POST" action="/checkout" onSubmit={e => onSubmit(e)}>
            <div className="grid-checkout">
                <div id="contact-details">
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
                     
                </div>
                <div id="shipping-option">
                    <h3 className="left font-and-color">Shipping option</h3>
                    
                    
                    <div className="option-for-shipping" >
                        
                            <div class="checkbox-wrapper-31 packeta-selector-open">
                                <input type="checkbox" value="packeta-widget" onChange={e => onSubmit(e)}/> 
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
                        <input type="checkbox" />
                            <svg viewBox="0 0 35.6 35.6">
                                <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                             </svg>
                        </div>
                    </div>

                    <div className="option-for-shipping">
                        <div class="checkbox-wrapper-31">
                        <input type="checkbox" />
                            <svg viewBox="0 0 35.6 35.6">
                                <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                             </svg>
                        </div>
                    </div>
                    
                </div>
                <div id="payment-option">
                <h3 className="left font-and-color">Payment Option</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis, nisi in consectetur hendrerit, est velit molestie quam, a mattis ex ante quis nunc. Curabitur sollicitudin, lorem id auctor mattis, ligula erat euismod orci, quis elementum nisi diam quis orci. Nulla a ex lectus. Cras mollis porttitor massa eget sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed quis enim eu lorem iaculis tempus eu pulvinar dolor. Mauris cursus nisl eget venenatis pellentesque. Sed suscipit ante vel mi fermentum, vitae venenatis erat maximus. Integer at placerat elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur vehicula orci diam, sed iaculis dolor iaculis ac. Mauris sed semper urna. Maecenas sit amet felis at sapien malesuada ultricies id ac tellus.
                    </p>
                </div>
                <div id="card-details">
                    <h3 className="left font-and-color">Card Details</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis, nisi in consectetur hendrerit, est velit molestie quam, a mattis ex ante quis nunc. Curabitur sollicitudin, lorem id auctor mattis, ligula erat euismod orci, quis elementum nisi diam quis orci. Nulla a ex lectus. Cras mollis porttitor massa eget sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed quis enim eu lorem iaculis tempus eu pulvinar dolor. Mauris cursus nisl eget venenatis pellentesque. Sed suscipit ante vel mi fermentum, vitae venenatis erat maximus. Integer at placerat elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur vehicula orci diam, sed iaculis dolor iaculis ac. Mauris sed semper urna. Maecenas sit amet felis at sapien malesuada ultricies id ac tellus.
                    </p>
                </div>
                <button type="sumbit" className="button-checkout">Sumbit Order!</button>
            </div>
            </form>
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

