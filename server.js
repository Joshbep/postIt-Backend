// express Instance
const express = require ("express")
const app = express();

// internal modules
const routes = require('./routes')

require('dotenv').config()

const PORT = process.env.PORT || 3001


// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/posts", routes.posts)

app.listen (PORT, () => {
    console.log(" Connected! ")
})
