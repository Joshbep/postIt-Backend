// express Instance
const express = require ("express")
const app = express();

// internal modules
const routes = require('./routes')

//multer
const multer = require("multer");

// method override
const methodOverride  = require('method-override')

//path
const path = require("path");

// Bcrypt
const bcrypt = require('bcrypt')

// Express Session
const session = require('express-session')

//import cors
const cors = require('cors')

require('dotenv').config()
// Port
const PORT = process.env.PORT || 3001


// Session Secret
const SESSION_SECRET = process.env.SESSION_SECRET
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

//whitelist and corsOptions
const whitelist = ['http://localhost:3000', "http://localhost:3001"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            // bypasses postman request with no origin
            return callback(null, true)
        }
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS!'))
        }
    }
}


// Middleware
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//https://expressjs.com/en/resources/middleware/multer.html
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


// Routes
app.use("/posts", routes.posts)
app.use("/users", routes.users)
app.use("/images", express.static(path.join(__dirname, "public/images")));
//DB connection
require('./config/db.connection')

app.listen (PORT, () => {
    console.log(" Connected! ")
})
