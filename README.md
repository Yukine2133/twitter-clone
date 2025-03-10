# Twitter Clone

Welcome to my Twitter Clone project! This full-stack web application replicates the core functionalities of Twitter, emphasizing functionality over UI aesthetics. While the user interface may not be the primary focus, the application offers a robust feature set, providing an engaging and interactive user experience.

## Features

**Tweets**: Create, update, read, and delete tweets. Users can like, retweet, and bookmark tweets, with support for attaching images and videos.

**Replies**: Post, edit, read, and delete replies to tweets. Replies can also include images and videos for richer interactions.

**Profile Management**: Update profile details, manage a private profile setting, add background images, and view all tweets and retweets in user profiles.

**Search Functionality**: Search for tweets, users, and hashtags.

**Hashtag System**: Displays trending hashtags based on tweet usage, making it easy to explore popular topics and discussions.

**Real-time Messaging**: Send and receive direct messages instantly with real-time updates powered by WebSockets (Pusher), including support for images. Messages can be updated or deleted.

**AI Chatbot**: Integrated AI chatbot using the Gemini API for enhanced user interactions.

**Premium Subscription**: A Stripe-powered premium system that unlocks exclusive features.

**Notifications**: Receive notifications for likes, retweets, replies, and new followers to stay up to date with all interactions.

## Technologies Used

- **Next.js 14.1.4**
- **UploadThing**
- **React-Toastify**
- **Zod**
- **Mongoose**
- **Clerk Auth**
- **Hero Icons**

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Yukine2133/twitter-clone.git
   cd twitter-clone
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/api/auth/success
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/api/auth/success

   MONGODB_URL=

   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=

   PUSHER_APP_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_CLUSTER=

   STRIPE_SECRET_KEY=
   STRIPE_PRICE_MONTHLY=
   STRIPE_PRICE_YEARLY=
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   STRIPE_WEBHOOK_SECRET=

   GEMINI_API_KEY=
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
