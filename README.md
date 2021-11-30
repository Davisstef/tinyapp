# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

This is the Index of all of the user's created URLs. The long URL is a link to the website.
!["Index"](#Index.png)

This is where users must log in or follow the link to create an account. Users must log in or sign up with a valid email and password.
!["Login"](#Login.png)

This is where new users must register with a valid email and password to use the Tinyapp.
!["Register"](#Register.png)

This is the area where users can create a tiny URL by entering the website name.
!["NewURL"](#NewURL.png)

This page displays the long URL and the tiny URL. Both the long URL and tiny URL send the user to the website.
!["YourURL"](#YourURL.png)

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