# Twitter Clone

Welcome to the Twitter Clone project! This project is a full-stack web application that mimics the core functionalities of Twitter. Users can create, read, update, and delete tweets and replies, like tweets, retweet, bookmark tweets, search for content, send messages, and receive notifications.

## Features

- **Tweets**
  - Create, update, read, and delete tweets.
  - Like and retweet tweets.
  - Bookmark tweets.
  - Attach images and videos to tweets.
- **Replies**
  - Create, update, read, and delete replies to tweets.
  - Attach images and videos to replies.
- **Profile**
  - Update profile information.
  - Follow and unfollow users.
  - View the created tweets and retweets of the user in their profile.
- **Search**
  - Search for tweets and users.
- **Messaging System**
  - Send and receive direct messages.
  - Delete and update messages.
  - Send images in messages.
- **Notifications**
  - Receive notifications for likes, retweets, replies and following.

## Technologies Used

- **Next.js 14.1.4**: A React framework for server-side rendering and building static web applications.
- **Uploading**: For uploading files such as images and vidoes.
- **React-Toastify**: To display toast notifications.
- **React-Textarea-Autosize**: A resizable textarea component.
- **Zod**: For schema validation and validation error handling.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Kinde Auth**: Authentication and authorization management.
- **Hero Icons**: A set of free, MIT-licensed high-quality SVG icons for UI development.
- **ChatGPT**: For natural language processing and assistance.

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

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React-Toastify](https://github.com/fkhadra/react-toastify)
- [React-Textarea-Autosize](https://github.com/Andarist/react-textarea-autosize)
- [Zod](https://github.com/colinhacks/zod)
- [Mongoose](https://mongoosejs.com/)
- [Kinde Auth](https://kinde.com/)
- [Hero Icons](https://heroicons.com/)
- [ChatGPT](https://openai.com/chatgpt/)
