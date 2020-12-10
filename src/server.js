const express = require('express')
const dotenv = require('dotenv')
//Loading env variables
dotenv.config({ path: './config/config.env' })

const app = express()
const PORT = process.env.PORT || 5000



app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} mode and on PORT: ${PORT}`))

