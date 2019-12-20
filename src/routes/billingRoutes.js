import keys from '../../config/keys';
import checkIfLoggedIn from '../middleware/checkIfLoggedIn';
const stripe = require('stripe')(keys.stripeSecretKey);


export default (app) => {
  app.post('/api/stripe', checkIfLoggedIn, async (req, res) => {

    const charge = await stripe.charges.create({ // make a request to the stripe API by saying hi we want to finalise this transition
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id // Charge authorzation
    });
    console.log('here is the charge ===>>', charge)
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
