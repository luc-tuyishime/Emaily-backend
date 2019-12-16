import stripe from 'stripe';
import keys from '../../config/keys';

const { stripeSecretKey } = keys;

export default (app) => {
  app.post('api/stripe', (req, res) => {
    console.log(req.body);
  });
};
