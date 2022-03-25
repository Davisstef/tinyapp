# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

This is the Index of all of the user's created URLs. The long URL is a link to the website. You can view the short URL from here.
![Index](https://user-images.githubusercontent.com/60591525/143985838-5fa2c0d6-20b5-4396-9519-133234c2818b.png)

This is where users must log in or follow the link to create an account. Users must log in or sign up with a valid email and password.
![Login](https://user-images.githubusercontent.com/60591525/143985861-47b9c6c3-73ef-45e8-8d06-e57534b433d5.png)

This is where new users must register with a valid email and password to use the Tinyapp.
![Register](https://user-images.githubusercontent.com/60591525/143985876-efa66787-5c0f-4e1f-be62-3cf2bce0b3f3.png)

This is the area where users can create a tiny URL by entering the website name.
![NewURL](https://user-images.githubusercontent.com/60591525/143985891-f5fb5078-5289-4741-ae20-2cff2891453d.png)

This page displays the long URL and the tiny URL. Both the long URL and tiny URL both send the user to the website.
![YourURL](https://user-images.githubusercontent.com/60591525/143985900-a3cff9b9-b5f1-4056-8722-63660cbb9e3d.png)

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
