import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import Button from '../button/button-component';
import './payment-form.styles.scss';

import { selectCartTotal } from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector';
import { clearCart } from '../../store/cart/cart.action';

const PaymentForm =()=>{
    const stripe = useStripe();
    const elements =useElements();

    const amount=useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment]=useState(false);

    const dispatch=useDispatch();
    const paymentHandler=async(e)=>{
        e.preventDefault();

        if(!stripe || !elements){
            return ;
        }
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body : JSON.stringify({amount:amount*100}),
        }).then(res=>{
            return res.json();
        });
    
        const clientSecret =response.paymentIntent.client_secret;
        
        const paymentResult = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement),
                billing_details : {
                    name: currentUser ? currentUser.displayName : 'Guest'
                },
            },
        });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error.message);
        }else{
            if(paymentResult.paymentIntent.status==='succeeded'){
                alert('Payment Successful');
                dispatch(clearCart());
            }
        }
    };

    return(
    <div className='payment-form-container' >
      <form className='form-container' onSubmit={paymentHandler}>  
       <h2>Card Payment:</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType='inverted' >PAY NOW</Button>
      </form>
    </div>
    );
};
export default PaymentForm;