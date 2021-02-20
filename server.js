const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const uuidv4 = require('uuidv4');


// Initialize the app and create a port
const app = express();
// Dynamic port for heroku deployment
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// static files and resources
app.use(express.static("public"));
// reqiure our abstracted route folders
//app.use("/api", apiRoutes(app) );
//app.use("/", htmlRoutes(app) );
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Start the server on the port 
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));