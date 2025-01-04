# Twitter Clone

Welcome to my Twitter Clone project! This full-stack web application replicates the core functionalities of Twitter, emphasizing functionality over UI aesthetics. While the user interface may not be the primary focus, the application offers a robust feature set, providing an engaging and interactive user experience.

## Features

**Tweets**: Create, update, read, and delete tweets. Users can like, retweet, and bookmark tweets, with support for attaching images and videos.

**Replies**: Post, edit, read, and delete replies to tweets. Replies can also include images and videos for richer interactions.

**Profile Management**: Update profile details, manage a private profile setting, add background images, and view all tweets and retweets in user profiles.

**Search Functionality**: Search for tweets, users, and hashtags.

**Hashtag System**: Displays trending hashtags based on tweet usage, making it easy to explore popular topics and discussions.

**Direct Messaging**: Send and receive direct messages, including images. Messages can be updated or deleted.

**Notifications**: Receive notifications for likes, retweets, replies, and new followers to stay up to date with all interactions.

## Technologies Used

- **Next.js 14.1.4**
- **UploadThing**
- **React-Toastify**
- **Zod**
- **Mongoose**
- **Kinde Auth**
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
   Create a `.env` file in the root directory and add the following variables:

   ```env
   KINDE_CLIENT_ID=Kinde Client ID
   KINDE_CLIENT_SECRET=Kinde Client Secret
   KINDE_ISSUER_URL=Kinde Issuer URL
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/success
   MONGODB_URL=MongoDB Connection URL
   UPLOADTHING_SECRET=Uploadthing secret
   UPLOADTHING_APP_ID=Uploadthing App ID
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
