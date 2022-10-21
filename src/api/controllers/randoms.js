import { fork } from 'child_process'
import { join } from 'path'
import { CLUSTER } from '../../config.js'

export const getRandom = (req, res, next) => {
    if (!CLUSTER) {
        const cant = req.query.cant || 10_000_000_000

        const child = fork(join(`${process.cwd()}/src/utils/addRandom.js`))

        child.send(cant)
        child.on('message', val => {
            console.log('a')
            res.json({
                suma: val,
            })
        })
    } else {
        let number = 0

        for (let i = 0; i < 5e9; i++) number += i

        res.send(`La suma es ${number}`)
    }
}
