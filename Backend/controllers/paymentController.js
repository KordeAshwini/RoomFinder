const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const sendEmail = require('../utils/sendEmail');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId)
        .populate('property')
        .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (booking.status !== 'Accepted') {
      return res.status(400).json({ message: 'Payment for this booking is not due yet.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: booking.property.propertyName,
              description: `Rent for ${booking.property.propertyName} in ${booking.property.city}`,
            },
            unit_amount: parseInt(booking.property.rent) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: booking.user.email,
      success_url: `http://localhost:5173/user-profile?payment=success&bookingId=${bookingId}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/user-profile?payment=cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Stripe session' });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { bookingId, sessionId } = req.body;

    // const session = await stripe.checkout.sessions.retrieve(sessionId);
    // if (session.payment_status !== 'paid') {
    //   return res.status(400).json({ message: 'Payment not successful.' });
    // }

    const booking = await Booking.findById(bookingId).populate({
      path: 'property',
      populate: {
        path: 'ownerId',
        model: 'User',
      },
    }).populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Check if the booking status is already Confirmed to prevent re-processing
    if (booking.status === 'Confirmed') {
        //console.log('Booking already confirmed, no further action needed.');
        return res.status(200).json({ message: 'Payment already confirmed.' });
    }

     const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not successful.' });
    }
    

    const amount = parseInt(booking.property.rent);
    if (isNaN(amount)) {
      return res.status(500).json({ message: 'Invalid rent amount for the property.' });
    }
    
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    try {
        const newPayment = new Payment({
            bookingId: booking._id,
            userId: booking.user._id,
            transactionId: paymentIntent.id,
            amount: amount,
            status: paymentIntent.status,
            date: new Date(),
        });
        await newPayment.save();
    } catch (dbError) {
        // Catch and handle the duplicate key error specifically
        if (dbError.code === 11000) {
            console.warn('Duplicate payment record found, preventing new entry.');
        } else {
            throw dbError; // Re-throw other database errors
        }
    }

    booking.status = 'Confirmed';
    await booking.save();

    await sendEmail(
      booking.user.email,
      'Payment Confirmed!',
      `Hi ${booking.user.name},\n\nYour payment for ${booking.property.propertyName} has been successfully confirmed. Your booking is now active. Enjoy your stay! Transaction ID: ${paymentIntent.id}`
    );

    await sendEmail(
      booking.property.ownerId.email,
      'New Booking Payment Confirmed!',
      `Hi ${booking.property.ownerId.name},\n\nPayment for the booking of your property, ${booking.property.propertyName}, has been successfully confirmed. The tenant is ${booking.user.name}. Transaction ID: ${paymentIntent.id}`
    );

    res.status(200).json({ message: 'Payment confirmed and emails sent successfully!' });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ message: 'Server error confirming payment.' });
  }
};