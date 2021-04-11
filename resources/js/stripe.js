import axios from 'axios'
import Noty from 'noty'
import { loadStripe } from '@stripe/stripe-js'
export async function initStripe() {
    const stripe = await loadStripe('pk_test_51IejIVSBkwMSvMnIWgmf6k8938xMerzp1aSBZaSlzzyLSnLQeKNdl43gLxtQ9YPidWVrG6waBrUinkLTymnIEKno00dVtgYe6s');
    let card = null;
    function mounutcard() {
        const elements = stripe.elements()
        let style = {
                    base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                    },
                    invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                    }
        }
        card = elements.create('card', { style: {}, hidePostalCode: true })
        card.mount('#card-element')
    }
    const paymentType = document.querySelector('#paymentType');
    if(!paymentType) {
        return;
    }
        paymentType.addEventListener('change' , (e)=> {
            if(e.target.value === 'card') {
                // Display Widget
                mounutcard();
            } else {
                card.destroy()
            }
        })
    const cart = document.querySelector('#cart')
        if(cart) {
            cart.addEventListener('submit', (e) => {
                e.preventDefault();
                let formData = new FormData(cart);
                let formObject = {}
                for(let [key, value] of formData.entries()) {
                    formObject[key] = value
                }
                //card
                if(!card) {
                    axios.post('/orders', formObject).then((res) => {
                        new Noty({
                            type: 'success',
                            timeout: 1000,
                            text: res.data.message,
                            progressBar: false,
                        }).show();
                        setTimeout(() => {
                            window.location.href = '/customer/orders';
                        }, 1000);
                    })
                    return;
                }
                stripe.createToken(card).then((result) => {
                    formObject.stripeToken = result.token.id;
                    axios.post('/orders', formObject).then((res) => {
                        new Noty({
                            type: 'success',
                            timeout: 1000,
                            text: res.data.message,
                            progressBar: false,
                        }).show();
                        setTimeout(() => {
                            window.location.href = '/customer/orders';
                        }, 1000);
                    })  
                }).catch((error) => {
                    console.error(error)
                })
            })
        }
}