import React, {useEffect, useState} from 'react';
import "./PlansScreen.css";
import db from "../firebase";
import { selectUser } from "../features/counter/userSlice";
import { useSelector } from 'react-redux';
import {loadStripe} from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription,setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);
  

  useEffect(() =>{
    db.collection("products")
    .where("active", "==", true)
    .get()
    .then((querySnapshot) => {
        const products ={};
        querySnapshot.forEach(async (productDoc) => {
            products[productDoc.id] = productDoc.data();
            const priceSnap =  await productDoc.ref.collection('prices').get();
            priceSnap.docs.forEach((price) => {
                products[productDoc.id].price ={
                    priceId : price.id,
                    priceData : price.data()
                };
            });
        });
        setProducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db.collection('customers')
    .doc(user.uid).collection("checkout_sessions")
    .add( {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });
    docRef.onSnapshot(async(snap)=>{
        const {error, sessionId} = snap.data();

        if(error) {
            alert("An error occured: $(error.message)");
        }

        if(sessionId) {
            const stripe = await loadStripe('pk_test_51NPUrpGdDe5GKQDheHaQZxCTNq8ayFTAGJeVuaFlvI9PtR6fNCTzqrqzWCAwL3toYPlQ5ncUSUR1mqYIASje9c2f00tutZqLxU');
            stripe.redirectToCheckout({sessionId});
        }
    });
  };
  
  return (
        <div className='plansScreen'>
            <br /> 
            {subscription&& (
             <p>
                Renewal Date {" "}
                {new Date(
                    subscription?.current_period_end * 1000
                ).toLocaleDateString()}    
                
            </p> 
            )}
            {Object.entries(products).map(([productId, productData]) => {
            
            const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);


               return (
                <div  key={productId}
                className={`${
                    isCurrentPackage && 'plansScreen__plans--disabled'}
                    plansScreen__plans`}>
                    <div className='plansScreen__info'> 
                        <h5> {productData.name} </h5>
                        <h6> {productData.description} </h6>
                    </div>

                    <button className='subscribe__button' onClick={() => !isCurrentPackage && loadCheckout(productData.price?.priceId)}>
                      {isCurrentPackage ? "Current Package" : "Subscribe"}
                    </button>
                </div>  
                
            );
            })}
        </div>
  )

}

export default PlansScreen