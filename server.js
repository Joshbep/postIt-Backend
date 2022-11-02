// express Instance
const express = require ("express")
const app = express();

require('dotenv').config()

const PORT = process.env.PORT || 3001


// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen (PORT, () => {
    console.log(" Connected! ")
})
