require("dotenv").config()
const express = require('express')
const app = express()
const router = require('./routes/router')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const apidocs = require('./apidocs.json')

const PORT = process.env.PORT || 5000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apidocs))
app.use((req, res) => {
    res.statusCode = 404
    res.send("Page Not Found")
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

