// 'require' is the older syntax for the newer 'import' in es6.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// native node module that let's us build out 'pathing' for out directories. Helps calculate the path to specific files
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// bring in stripe library. bring in after process.env in order to have access to our .env
// returns a function that requires the 1st argument of the secret key.
// return us the stripe response and immediately invoke it with our secret key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// make our client directory the default directory to serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  // for any route requested, that is not otherwise specified, respond with this file.
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

// req object will provide us with the token we need
// create the appropriate body object to accept the token
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };
  // make a payment with this .create and we pass it the body object we just made above, then pass it a callback of a function that responds to the request we just made with either a status of 500 if we got an error, or a status of 200 if we got a successful stripe charge.
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
