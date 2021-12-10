# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

This is the Index of all of the user's created URLs. The long URL is a link to the website.
![Index](https://user-images.githubusercontent.com/60591525/145494851-dc5ed238-5037-4938-83d6-074385a79451.png)

This is where users must log in or follow the link to create an account. Users must log in or sign up with a valid email and password.
![Login](https://user-images.githubusercontent.com/60591525/145494863-6164b729-4bde-4855-a0d9-615bd7945ba7.png)

This is where new users must register with a valid email and password to use the Tinyapp.
![Register](https://user-images.githubusercontent.com/60591525/145494883-938f96b7-0938-47a5-899f-5fb26d407255.png)

This is the area where users can create a tiny URL by entering the website name.
![NewURL](https://user-images.githubusercontent.com/60591525/145494936-d2a84eef-f92a-4c0a-9ed2-4f84cf826aa3.png)

This page displays the long URL and the tiny URL. Both the long URL and tiny URL send the user to the website.
![YourURL](https://user-images.githubusercontent.com/60591525/145494947-5d123a02-6c5b-423e-aa6a-1e459c4e8aa4.png)

## Dependencies

- body-parser
- Express
- cookie-session
- bcrypt
- Node.js
- EJS
- nodemon




## Getting Started

- Install all dependencies (using the `npm install` command).
- Ensure you install nodemon as a development dependency (using the `npm install --save-dev nodemon` command).
- Confirm you have ran `npm install express`, `npm install ejs`, `npm install body-parser`, `npm install bcryptjs`, `npm install cookie-session`.
- Run the development web server using the `npm start` command.
- The website is http://localhost:8080/login.
