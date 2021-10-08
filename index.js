const express = require("express");
const app = express();
const router = express.Router();

// import fs (file system) and path modules
const fs = require("fs");
const path = require("path");

// import JSON file

/*
- Create new html file name home.html
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get("/home", (req, res) => {
  // Return home.html page to client
  res.sendFile("home.html", { root: __dirname });
});

/*
- Return all details from user.json file to client as JSON format
*/

// Read data from user.json file by using readFileSync() method on fs module
let dataReadFromUserJSONFile = fs.readFileSync(path.resolve(__dirname, "user.json"));
// parse to Javascript Object
let parsedDataOfUser = JSON.parse(dataReadFromUserJSONFile);

router.get("/profile", (req, res) => {
  // Return all details from user.json file to client in JSON format
  res.json(parsedDataOfUser);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file

- If username and  passsword is valid then send resonse as below
    {
        status: true,
        message: "User Is valid"
    }

- If username is invalid then send response as below
    {
        status: false,
        message: "User Name is invalid"
    }

- If passsword is invalid then send response as below
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.get("/login", (req, res) => {
  // http://localhost:8081/login?username=Mike&password=123456   // This will be URL with query strings in browser

  // Read username and password from query strings from req object
  let usernameFromQStr = req.query.username;
  let passwordFromQStr = req.query.password;

  // Read data from user.json file by using readFileSync() method on fs module
  let dataFromUserJSON = fs.readFileSync(path.resolve(__dirname, "user.json"));
  // parse to Javascript Object
  let parsedDataOfUser = JSON.parse(dataFromUserJSON);

  // Get stored username and password in json file
  let storedUsrnameFromJSONFile = parsedDataOfUser.username;
  let storedPswrdFromJSONFile = parsedDataOfUser.password;

  // Check if username and password match the one sent by client
  if (storedUsrnameFromJSONFile === usernameFromQStr && storedPswrdFromJSONFile === passwordFromQStr) {
    // send status and response
    res.json({
      status: true,
      message: "User Is valid",
    });
  } else if (storedUsrnameFromJSONFile !== usernameFromQStr) {
    // If username is invalid
    // send status and response
    res.json({
      status: false,
      message: "User Name is invalid",
    });
  } else if (storedPswrdFromJSONFile !== passwordFromQStr) {
    // If password is invalid
    // send status and response
    res.json({
      status: false,
      message: "Password is invalid",
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

// accept username as parameter in URL
router.get("/logout/:username", (req, res) => {
  // set header for showing html
  res.setHeader("Content-type", "text/html");
  // Show html message
  res.send(`<b>${req.params.username} successfully logout.<b>`);
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("The NodeJS server is running on port " + (process.env.port || 8081));
