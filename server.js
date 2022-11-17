// express Instance
const express = require ("express")
const app = express();

// internal modules
const routes = require('./routes')

// method override
const methodOverride  = require('method-override')

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
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function(origin, callback) {
        // if (whitelist.indexOf(origin) !== -1) {
        //     callback(null, true)
        //   } else {
        //     callback(new Error('Not allowed by CORS'))
        //   }
    callback(null, true)
    }
}


// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/posts", routes.posts)
app.use("/users", routes.users)

//DB connection
require('./config/db.connection')

app.listen (PORT, () => {
    console.log(" Connected! ")
})
