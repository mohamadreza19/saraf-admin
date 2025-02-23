Angular SSR with Express Server (Now Equipped with Locales) 🌍
This project is an Angular SSR (Server-Side Rendering) setup with Express, now enhanced with locale support! 🌎✨
It enables rendering Angular applications on the server for better SEO, performance, and faster page loads, with multilingual capabilities.

🚀 Getting Started
1️⃣ Install Dependencies
Ensure you have Node.js and npm installed, then run:

sh
Copy
Edit
npm install
2️⃣ Build for SSR
To compile the project for SSR, run:

sh
Copy
Edit
npm run build
This command builds the Angular Universal application and generates the dist/ folder containing both browser and server files.

3️⃣ Start the SSR Server with Locales
After building the project, start the SSR server using:

sh
Copy
Edit
npm run serve:ssr2
Once the server starts, you should see:

nginx
Copy
Edit
Node Express server listening on http://localhost:4000
Your Angular app is now running with server-side rendering and locale support! 🎉

🌐 Using Locales
You can now request different locales by accessing:

arduino
Copy
Edit
http://localhost:4000/<locale>
For example:

English: http://localhost:4000/en
Farsi: http://localhost:4000/fa
This setup ensures proper internationalization and localization for your Angular SSR app.
