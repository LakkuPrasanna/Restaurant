import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Itemdetail = ({ userId }) => {
    const [itemdetails, setItemdetails] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);
    const parameters = useParams();
    const items = parameters.number;
    const navigate = useNavigate(); 

    const Itemlist = async () => {
        try {
            const response = await axios.get("http://localhost:3008/itemdetail?item_id=" + items);
            if (response && response.data.status === "success") {
                setItemdetails(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };

    const addToCart = async (productId) => {
        const quantity = cartQuantity;
        try {
           
            if (!itemdetails) {
                alert("Item details are missing");
                return;
            }
    
            
            const itemName = itemdetails.name;
            const itemPrice = itemdetails.price;
            const itemImage = itemdetails.image;
    
            await axios.post("http://localhost:3008/api/items/add", {
                name: itemName,
                price: itemPrice,
                image: itemImage, 
            });
    
            
            const response = await axios.post("http://localhost:3008/api/cart/add", {
                userId,
                productId: itemdetails.itemid,
                quantity,
                image: itemImage, 
            });
    
            alert(response.data.message);
        } catch (error) {
            console.error("Item added to cart:", error);
            alert("Error adding item to cart");
        }
    };
    
    

    const increaseQuantity = () => {
        setCartQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setCartQuantity(prevQuantity => Math.max(0, prevQuantity - 1)); 
    };

    useEffect(() => {
        Itemlist();
    }, []);


    const navigateToCart = () => {
        navigate("/Viewcart"); 
    };

    return (
        <div>
            {itemdetails ? (
                <div className="product-outer d-flex bg-white">
                    <div className="left bg-white ">
                        <img className="image1" src={itemdetails.image} alt={itemdetails.name}></img>
                    </div>
                    <div className="right bg-white d-flex">
                        <div className="right-left bg-white p-3">
                            <h4>{itemdetails.name}</h4>
                            <hr />
                            <pre>{"DISCOUNT:   " + itemdetails.discount}</pre>
                            <pre>{"PRICE:      " + itemdetails.price}</pre>
                            <pre>{"RATING:     " + itemdetails.rating}</pre>
                            <pre>{"QUANTITY:   " + itemdetails.quantity}</pre>
                            <pre>{"DeliveryTime: " + itemdetails.time}</pre>
                            <div className="d-flex">
                                <div className="mt-2">
                                    <Button style={{ backgroundColor: 'rgb(255 165 0)', color: 'black', border: "transparent", type: "submit" }}>
                                        ORDER NOW
                                    </Button>
                                </div>
                                <div className="d-flex align-items-center">
                                    {cartQuantity === 0 ? (
                                        <Button style={{ backgroundColor: 'rgb(255 165 0)', color: 'black', border: "transparent", marginLeft: '20px' }} onClick={() => { setCartQuantity(1); addToCart(itemdetails.id); }}>
                                            ADD
                                        </Button>
                                    ) : (
                                        <>
                                            <Button className="button-1" onClick={decreaseQuantity} disabled={cartQuantity === 0}>-</Button>
                                            <span className="quantity-1 mx-2">{cartQuantity}</span>
                                            <Button className="button-2" onClick={increaseQuantity}>+</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <Link to="/Viewcart"><Button className="viewcart"> {}
                {cartQuantity > 0 && (
                    <>
                        <span style={{ marginRight: '18px' }}>{`${cartQuantity} items added`}</span>
                    </>
                )}
                ViewCart{"  >"}
            </Button></Link>
        </div>
    );
};

export default Itemdetail;
