import minimist from 'minimist'

export const { PORT, CLUSTER } = minimist(process.argv.slice(2), {
    alias: {
        p: 'PORT',
        c: 'CLUSTER',
    },
    default: {
        p: process.env.PORT || 8080,
        c: false,
    },
})
