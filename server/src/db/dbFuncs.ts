import logModel from './logModel'
import { Parser } from '@json2csv/plainjs'
import fs from 'fs'
import path from 'path'

const dbFunc = {
    logCalculation: async (calcArr: []) => {
        let logPromises: any[] = []
        calcArr.forEach((calc: any) => {
            logPromises.push(
                new Promise((resolve, reject) => {
                    let newCalc = new logModel({
                        inputs: {
                            plats: calc.inputs.plats,
                            id3: calc.inputs.id3,
                            jordart: calc.inputs.jordart,
                            djup: Number(calc.inputs.djup),
                            smgkgts: Number(calc.inputs.smgkgts),
                            camgkgts: Number(calc.inputs.camgkgts),
                            femgkgts: Number(calc.inputs.femgkgts),
                            phinit: Number(calc.inputs.phinit),
                            phox: Number(calc.inputs.phox),
                        },
                        result: {
                            beskrivning_klassning_av_jorden:
                                calc.result['Beskrivning/klassning av jorden'],
                            granszon_mellan_A: calc.result['Gränszon 1'],
                            granszon_mellan_B: calc.result['Gränszon 2'],
                        },
                        date: calc.date,
                    })

                    newCalc
                        .save()
                        .then(() => {
                            resolve('SUCCESSFULL DB LOG')
                        })
                        .catch(() => {
                            reject('ERROR DURING DB LOG')
                        })
                })
            )
        })
        const result = await Promise.all(logPromises)
        return result
    },

    downloadDB: async (): Promise<boolean> => {
        const calcs = await logModel.find({}).exec()

        const fields = [
            'inputs.plats',
            'inputs.id3',
            'inputs.jordart',
            'inputs.djup',
            'inputs.smgkgts',
            'inputs.camgkgts',
            'inputs.femgkgts',
            'inputs.phinit',
            'inputs.phox',
            'result.beskrivning_klassning_av_jorden',
            'result.granszon_mellan_A',
            'result.granszon_mellan_B',
        ]
        const opts = { fields }

        const parser = new Parser(opts)
        const csv = parser.parse(calcs)

        try {
            const calcPath = path.join(__dirname, '..', 'dlc/calculations.csv')
            fs.writeFileSync(calcPath, csv)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
}

export default dbFunc
