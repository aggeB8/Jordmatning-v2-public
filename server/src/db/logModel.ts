import mongoose, { Schema, InferSchemaType } from 'mongoose'
import { LogSchema } from '../types/log.js'

const logSchema: Schema = new Schema({
    inputs: {
        plats: String,
        id3: String,
        jordart: String,
        djup: Number,
        smgkgts: Number,
        camgkgts: Number,
        femgkgts: Number,
        phinit: Number,
        phox: Number,
    },
    result: {
        beskrivning_klassning_av_jorden: String,
        granszon_mellan_A: String,
        granszon_mellan_B: String,
    },
    date: String,
})

export default mongoose.model<LogSchema>('calculations', logSchema)
