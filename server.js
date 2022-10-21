import app from './src/settings.js'
import { PORT, CLUSTER } from './src/config.js'
import http, { ClientRequest } from 'http'
import { normalizePort } from './src/utils/functions.js'
import { cpus } from 'os'
import cluster from 'cluster'

console.log(process.env.PORT)
const port = normalizePort(PORT)

app.set('port', port)

const server = http.createServer(app)
const val = cpus().length

if (CLUSTER && cluster.isPrimary) {
    console.log(`Proceso primaro con PID: ${process.pid}`)

    for (let i = 0; i < val; i++) cluster.fork()

    cluster.on('exit', worker => {
        console.log(`Proceso worker ${worker.process.pid} murio`)
        cluster.fork()
    })
} else {
    CLUSTER && console.log(`Proceso worker con PID: ${process.pid}`)
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
}

function onError(error) {
    if (error.syscall !== 'listen') throw error

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)

        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)

        default:
            throw error
    }
}

function onListening() {
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    console.log(`Listening on ${bind}`)
}
