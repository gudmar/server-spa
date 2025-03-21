const validRoutes = [
    'login', 'clock', 'stop-watch', 'logout'
]


const query = async(hashPath) => {
    const path = hashPath.split('#')[1]
    if (validRoutes.includes(path)) {
        const response = await makeRequest({
            method: 'GET',
            route: path
        })
        return response
    } else {
        makeRequest({
            method: 'GET',
            route: 'error'
        })
    }
        
}

const router = () => {
    console.log('Router launch')
    window.onhashchange = (e) => {
        console.log(e)
        console.log(e.currentTarget.location.hash)
    }
}

const bind = () => {
    router()
}

console.log(window.location)
console.log(window.location.hash)

window.onload = bind

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        bind();
    })
} else {
    bind();
}
