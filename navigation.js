export const NAVIGATION = [
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
        endpoint: 'login'
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