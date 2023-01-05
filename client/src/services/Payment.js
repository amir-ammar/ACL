import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { backendApi } from '../projectConfig';

async function handleCheckout(courseId) {
    let stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
    console.log("auth",localStorage.getItem('token'));
    await axios.post(`${backendApi}payment/create-checkout-session`,
        { courseId: courseId },
        {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ,).then((res) => {
            stripe.redirectToCheckout({ sessionId: res.data.id });
        }).catch((err) => {
            console.warn(err);
        });
}

export { handleCheckout }