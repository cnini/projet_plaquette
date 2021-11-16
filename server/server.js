const express = require('express')
const app = express()

const cors = require('cors')

require('dotenv').config({ path: "./config.env" })
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(require('./routes/admin/ue'))
app.use(require('./routes/admin/theme'))
app.use(require('./routes/admin/cours'))

const dbo = require('./db/connection')

app.listen(port, () => {
    dbo.connectToServer(function(err) {
        if (err) console.error(err)
    })

    console.log(`Server is running on port: ${port}`)
})

