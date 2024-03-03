import { Document } from 'mongoose'

export interface LogSchema extends Document {
    inputs: {
        plats: string
        id3: string
        jordart: string
        djup: number
        smgkgts: number
        camgkgts: number
        femgkgts: number
        phinit: number
        phox: number
    }
    result: {
        beskrivning_klassning_av_jorden: string
        granszon_mellan_A: string
        granszon_mellan_B: string
    }
}
