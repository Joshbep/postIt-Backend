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

const PORT = process.env.PORT || 3001


// Session Secret
const SESSION_SECRET = process.env.SESSION_SECRET
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

// Middleware
app.use(cors("*"))
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
