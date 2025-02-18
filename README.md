# Angular SSR with Express Server

This project is an **Angular SSR (Server-Side Rendering)** setup with **Express**. It allows rendering Angular applications on the server for better SEO, performance, and faster page loads.

## 🚀 Getting Started

1️⃣ **Install Dependencies**  
Ensure you have **Node.js** and **npm** installed, then run:

```sh
npm install
2️⃣ Build for SSR
To compile the project for SSR, run:

sh
Copy
Edit
npm run build:ssr
This command builds the Angular Universal application, generating a dist/ folder containing both the browser and server files.

3️⃣ Start the SSR Server
After building the project, start the SSR server using:

sh
Copy
Edit
npm run serve:ssr
Once the server starts, you should see:

nginx
Copy
Edit
Node Express server listening on http://localhost:4000
Your Angular app is now running with server-side rendering! 🎉

📌 Additional Information
Angular Universal is used to enable SSR.
The SSR server is powered by Express.js.
The application listens on port 4000 by default.
```
