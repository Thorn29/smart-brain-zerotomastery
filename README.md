# SmartBrain

A small app that scans images and provides facial recognition. The app was developed as part of the **Zero To Mastery** course by Andrei Neagoie

[See live demo](https://smart-brain-zerotomastery.herokuapp.com)

## Development

The app uses **React** for the frontend, and **Node** & **Express** for the backend, connected to a **PostgreSQL** database. The model it's based on, and which does the conversion is **Clarifai's AI Face Detection**.

Several improvements have been made compared to the original version of the app from the course, such as adding simple error messages, making a few design changes etc.

## Local setup

To set up this app locally, you need to follow several steps:

1. Download the code

2. Import the *smartbrain.sql* file from the *db_dump* subfolder into your PostgreSQL database

3. Create one *variables.js* file inside of the *smart-brain-api* subfolder

4. Inside of it, create and export a variable called *vars* that contains an object with the following properties: *dbHost, dbUser, dbPassword* and *dbName* (the values should correspond to your database credentials).

5. Create another *variables.js* file inside of the *smart-brain* subfolder

6. Inside of it, create and export a variable called *clarifaiApi* and enter your Clarifai API as the value.

7. Using your terminal, navigate into the *smart-brain-api* subfolder and run *npm install*, then do the same in the *smart-brain* subfolder

8. Using your terminal, inside the *smart-brain-api* subfolder, run *npm start*

9. Using your terminal, inside the *smart-brain* subfolder, run *npm start* (and when asked "would you like to run the app on another port instead?", press *y*)

That's it, the app should be up and running!
