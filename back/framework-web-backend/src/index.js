import express from 'express'
import db from './db/db.js'
import FilmeRoute from './routes/FilmeRoute.js'
import cors from 'cors'

const app = express()
const port = 1302

app.use(cors())
app.use(express.json())

app.use(FilmeRoute)

db.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`app running on port ${port}`)
        })
    })
