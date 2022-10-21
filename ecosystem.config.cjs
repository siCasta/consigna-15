module.exports = {
    apps: [
        {
            name: 'app1',
            script: './server.js',
            env: {
                PORT: 8082,
            },
            watch: true,
        },
        {
            name: 'app2',
            script: './server.js',
            env: {
                PORT: 8081,
            },
            exec_mode: 'cluster',
            instances: 8,
            node_args: '--harmony',
            watch: true,
        },
    ],
}
