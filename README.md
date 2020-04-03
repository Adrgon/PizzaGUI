# Pizza GUI
3rd homework assignment for [Pirple's NodeJS master class](https://pirple.thinkific.com/courses/the-nodejs-master-class).
This project is a frontend website that inteacts with JSON RESTful API free of 3rd-party dependencies for a pizza-delivery company utilizing Stripe and MailGun external services.


## Features
- [x] Signup, login, logout on the site
- [x] View all the items available to order
- [x] Fill up a shopping cart
- [x] Place an order (with fake credit card credentials), and receive an email receipt

## Manual

### Set up
0. Download the project.
1. Open the command prompt (for Windows, click Start icon and type in 'cmd') and go to the project directory.eg. :
`cd C:/CrazyPizzaGUI`
2. Run the app:
`node index.js`

Optionally, one can set the environment as command line argument (with value of 'production' or 'staging'). The default is 'staging'.

`node index.js production` (for Windows)
`NODE_ENV=production node index.js` (for Linux)

Optionally, one cat set DEBUG variable to print out messages in the console.

`set DEBUG=* & node index.js` (for Windows)

3. The app informs which ports are active.
4. Open up a web browser and go to the address printed out in point 3: `localhost:3000` or `localhost:5000`. 
Follow the Basic scenario below to learn how to navigate on the website.
5. Push `Ctrl` + `C` in the console to stop the app.

