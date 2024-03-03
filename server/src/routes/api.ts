import express from 'express'
import { Request, Response } from 'express'
import dbFunc from '../db/dbFuncs'
import bcrypt from 'bcrypt'
import calculationMw from '../middleware/calculations'
import path from 'path'

let router = express.Router()

router.post(
    '/newcalc',
    [calculationMw.checkIfNum, calculationMw.calculate],
    async (req: Request, res: Response) => {
        if (res.locals.status === 'success') {
            dbFunc
                .logCalculation(res.locals.calculated)
                .then(() => {
                    res.json(res.locals.calculated)
                })
                .catch(() => {
                    res.json('database-error')
                })
        } else {
            res.json(res.locals.err)
        }
    }
)

router.post('/dlc', async (req: Request, res: Response) => {
    const passCheck = bcrypt.compareSync(
        req.body.password || '',
        process.env.DLC_PASS_HASH!
    )

    if (passCheck) {
        delete req.body.password

        const downloadDB = await dbFunc.downloadDB()
        if (downloadDB) {
            res.download(path.join(__dirname, '..', 'dlc/calculations.csv'))
        } else {
            res.status(500)
            res.send()
        }
    } else {
        res.status(401)
        res.send()
    }
})

export default router
