import axios from 'axios'
import qs from 'qs'
import 'dotenv'

let config: any = {
    method: 'post',
    maxBodyLength: Infinity,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: '/api/newcalc',
}

async function postCalculation(calcData: []) {
    config.data = qs.stringify({
        ...calcData,
    })

    const res = await axios.request(config)
    return res.data
}

export { postCalculation }
