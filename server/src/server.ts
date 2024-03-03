import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { connectDB } from './db/dbConn'
import { rateLimit } from 'express-rate-limit'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const app = express()
const port = 3000

let viewPath: string
if (process.env.NODE_ENV === 'production') {
    viewPath = __dirname + '/views/'

    app.use(express.static(viewPath))

    app.use(
        cors({
            origin: 'http://verktyg.optimass.se',
        })
    )

    app.get('*', function (req, res) {
        res.sendFile(viewPath + 'index.html')
    })
} else {
    app.use(cors())
}

const limiter = rateLimit({
    windowMs: 10000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

app.use(limiter)
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

import apiRoute from './routes/api'
app.use('/api', apiRoute)

connectDB().then(() => startServer())

function startServer() {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}
