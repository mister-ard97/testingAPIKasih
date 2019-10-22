module.exports = {
    apps: [
        {
            name: 'ProjectKasihNusantaraReal',
            script: './index.js',
            env : {
                NODE_ENV : 'development'
            },
            env_production : {
                NODE_ENV : 'production',
            },
            time: true
        }
    ]
}