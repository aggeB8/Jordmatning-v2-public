import { Request, Response, NextFunction } from 'express'

const calculationMw = {
    checkIfNum(req: Request, res: Response, next: NextFunction) {
        // get calculations
        const calcCount = Object.keys(req.body).length

        // keys that need to be numbers
        const numSensitive = [
            'djup',
            'smgkgts',
            'camgkgts',
            'femgkgts',
            'phinit',
            'phox',
        ]

        // get all calculation objects
        for (let i = 0; i < calcCount; i++) {
            let data = JSON.parse(req.body[i])

            // for every object in calc-data
            for (let key in data) {
                let value = data[key]

                // sanitize input
                if (value === 'undefined' || value === '') {
                    res.locals.sanitizeStatus = 'failed'
                    res.locals.err = 'empty-fields'
                    next()
                } else if (numSensitive.includes(key)) {
                    if (isNaN(value)) {
                        res.locals.sanitizeStatus = 'failed'
                        res.locals.err = 'NaN'
                        next()
                    } else {
                        res.locals.sanitizeStatus = 'success'
                    }
                }
            }
        }
        next()
    },

    calculate(req: Request, res: Response, next: NextFunction) {
        const calculatedArr: any = []

        const calcCount = Object.keys(req.body).length

        if (res.locals.sanitizeStatus === 'failed') {
            res.locals.status = 'failed'
            next()
        } else if (res.locals.sanitizeStatus === 'success' && calcCount <= 10) {
            // CALCULATIONS...
            // CALCULATIONS...
            // CALCULATIONS...
            // CALCULATIONS...
            // CALCULATIONS...
            // CALCULATIONS...
        }
        res.locals.status = 'success'
        res.locals.calculated = calculatedArr
        next()
    },
}

export default calculationMw
