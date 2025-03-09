import { stripe } from "@/utils/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === "development";
const PRODUCTION_URL = "https://twitter-clone-213.vercel.app";
const BASE_URL = isDevelopment ? "http://localhost:3000" : PRODUCTION_URL;

export async function POST(req: Request) {
  try {
    const { isAnnual } = await req.json();

    const user = await currentUser();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: isAnnual
            ? process.env.STRIPE_PRICE_YEARLY
            : process.env.STRIPE_PRICE_MONTHLY,
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/premium`,
      client_reference_id: user?.id,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
