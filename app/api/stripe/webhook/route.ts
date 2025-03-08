import { NextResponse } from "next/server";
import { buffer } from "micro";
import { stripe } from "@/utils/stripe";
import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/user.model";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const rawBody = await buffer(req.body as any);
    const sig = req.headers.get("stripe-signature") as string;

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.client_reference_id;

      await connectDb();
      await User.findOneAndUpdate(
        { userId },
        { $set: { isSubscribed: true } },
        { new: true }
      );

      console.log(`✅ User ${userId} marked as subscribed`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
