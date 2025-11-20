import { useServerStripe } from "#stripe/server";

import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  const { userData, productData, totalPrice } = await readBody(event)

  if (totalPrice <= 0) {
    throw createError({ statusCode: 422, message: 'Amount must be greater than zero' })
  }

  const orderAmount = totalPrice * 100;
  let paymentIntent;

  const customer = await stripe.customers.create({
    email: userData?.email,
  })

  try {
    for (const product of productData) {
      await prisma.payment.create({
        data: {
          productId: product.id,
          userId: userData.id,
          amount: Number(product.price)
        }
      });
    }

    paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      customer: customer.id,
      amount: orderAmount,
      automatic_payment_methods: { enabled: true },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      error: null,
      message: 'payment processed sucessfully !'
    };
  } catch (e) {
    console.error("Stripe payment error:", e);
    return {
      clientSecret: null,
      error: e,
    };
  }
});