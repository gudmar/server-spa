export const NAVIGATION = [
    {
        caption: 'Home',
        endpoint: '/'
    },
    {
        caption: 'Clock',
        endpoint: 'api/clock',
        scripts: [
            'clock/clock.js'
        ],
        styles: [
            'clock/clock.css'
        ]
    },
    {
        caption: 'Stop watch',
        endpoint: 'api/stop-watch',
        scripts: [
            '/stopWatch/stopWatch.js'
        ],
        styles: [
            'clock/clock.css',
            'stopWatch/stopWatch.css'
        ]
    },
    {
        caption: 'Login',
        endpoint: 'api/login',
        scripts: [
            'auth/login.js',
        ],
        styles: [
            'auth/login.css'
        ]
    },
    {
        caption: 'Logout',
        endpoint: 'logout'
    },
    {
        caption: 'Back',
        endpoint: 'back'
    }
]