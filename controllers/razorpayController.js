const Razorpay = require('razorpay');
const payments = require('../Models/razorpaySchema');
const profiles = require("../Models/profileSchema");
const crypto = require('crypto');
const razorpay = new Razorpay({
    key_id: 'rzp_test_ZNur9B6YEo4Vxm',
    key_secret: 'njd9COlAdhRfw89yu5gqbhnl',
});

//:razorpay payment

exports.checkout = async (req, res) => {
    console.log('inside checkout request');
  
    try {
      const { name, amount,plan,email } = req.body;
      console.log(`${name}, ${amount} ,${plan} ,${email}`);
  
      // Create an order using Razorpay
      const order = await razorpay.orders.create({
        amount: Number(amount * 100), // Amount in paise
        currency: 'INR',
      });
  
     
      await payments.create({
        order_id: order.id,
        plan,
        email,
        name,
        amount,
      })
  
      console.log('order', order);
      res.status(200).json(order);
    } catch (error) {
      console.error('Error during checkout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


exports.checkoutVerification = async (req, res) => {
    console.log('inside checkout verification request');
  
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    console.log(
      `${razorpay_payment_id},${razorpay_order_id},${razorpay_signature}`
    );
  
    // 1. Verify signature (assuming verification logic is correct)
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', 'njd9COlAdhRfw89yu5gqbhnl')
      .update(body_data)
      .digest('hex');
  
    console.log('Expected Signature:', expectedSignature);
    console.log('Received Signature:', razorpay_signature);
  
    const isValid = expectedSignature === razorpay_signature;
  
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
  
    // 2. Find or create order document
    try {
      const existingOrder = await payments.findOne({ order_id: razorpay_order_id });
      let updatedPayment;
        console.log(existingOrder);
      if (existingOrder) {
        // Order already exists, update payment details
        updatedPayment = await payments.findOneAndUpdate(
          { order_id: razorpay_order_id },
          {
            $set: {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature
            }
          },
          { new: true } // Return updated document
        );
       } 
       //else {
    //     // Create new order document if not found
    //     const newOrder = new payments({
    //       // Fill in order details (order_id, amount, etc.)
    //       razorpay_payment_id,
    //       razorpay_order_id,
    //       razorpay_signature
    //     });
    //     updatedPayment = await newOrder.save();
    //   }
  
      if (updatedPayment) {
        console.log('Signature verification successful');
        console.log('Payment document updated:', updatedPayment);
  
        // Redirect to success page with payment ID
        // res.redirect(`http://localhost:3000/paysuccess?payment_id=${razorpay_payment_id}`);
        res.redirect(`http://localhost:3000/paysuccess?payment_id=${razorpay_payment_id}&plan=${updatedPayment.plan}&amount=${updatedPayment.amount}&name=${updatedPayment.name}`);

      } else {
        // Payment document not found or update failed
        console.error('Payment document update failed');
        res.redirect(`http://localhost:3000/payfail`);
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      res.status(500).json({ error: 'Failed to update payment' });
    }
  };


//:get Transactions to admin

exports.getTransactions = async (req, res) => {
    console.log('Inside get Transactions');
  
    try {
      const transactionReports = await payments.find();
      console.log('tansactions:', transactionReports);
  
      const successTransactions = await Promise.all(transactionReports.map(async (transaction) => {
        const profile = await profiles.findOne({ email: transaction.email });
  
        return {
          transaction,
          profile,
        };
      }));
  
      console.log('Successfull Transactions:', successTransactions);
  
      res.status(200).json(successTransactions);
    } catch (error) {
      console.error('Error fetching Transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };













// exports.checkoutVerification = async (req, res) => {
//     console.log('inside checkout verification request');
//     console.log('Request Body:', req.body);
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
//     console.log(
//         `${razorpay_payment_id},${razorpay_order_id},${razorpay_signature}`
//       );
    

//     const body_data = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto.createHmac('sha256', 'njd9COlAdhRfw89yu5gqbhnl').update(body_data).digest('hex');

//     console.log('Expected Signature:', expectedSignature);
//     console.log('Received Signature:', razorpay_signature);

//     const isValid = expectedSignature === razorpay_signature;

//     try {
//         if (isValid) {
//             // Use findOneAndUpdate to update the document
//             const updatedPayment = await payments.findOneAndUpdate(
//                 { order_id: razorpay_order_id },
//                 {
//                     razorpay_payment_id,
//                     razorpay_order_id,
//                     razorpay_signature
//                 },
//                 { new: true } // Return the updated document
//             );

//             if (updatedPayment) {
//                 console.log('Signature verification successful');
//                 console.log('Payment document updated:', updatedPayment);
//                 res.redirect(`http://localhost:3000/paysuccess?payment_id=${razorpay_payment_id}`);
//             } else {
//                 console.error('Payment document not found');
//                 res.redirect(`http://localhost:3000/payfail`);
//             }
//         } else {
//             console.error('Invalid signature');
//             res.redirect(`http://localhost:3000/payfail`);
//         }
//     } catch (error) {
//         console.error('Error during MongoDB update:', error);
//         res.redirect(`http://localhost:3000/payfail`);
//     }
// };


