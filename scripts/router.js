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

const getOnContentLoad = (renderer) => async (e) => {
    console.log(e)
    console.log(e.currentTarget.location.hash)
    const endpoint = 'api/' + e.currentTarget.location.hash?.substr(1);
    const scripts = DEPENDENCIES?.[endpoint]?.scripts || []
    const styles = DEPENDENCIES?.[endpoint]?.styles || []
    console.log(endpoint, scripts, styles)
    await load({ endpoint, styles, scripts, renderer })
}

const loadHash = async (renderer) => {
    const endpoint = 'api/' + window.location.hash?.substring(1);
    const scripts = DEPENDENCIES?.[endpoint]?.scripts || []
    const styles = DEPENDENCIES?.[endpoint]?.styles || []
    await load({ endpoint, styles, scripts, renderer })
}

const router = async (renderer) => {
    console.log('Router launch')
    window.onhashchange = getOnContentLoad(renderer)
    await loadHash(renderer)
}

const updateHash = (apiEntpoint) => {
    const notApiArr = apiEntpoint.split('/');
    notApiArr.splice(0, 1);
    const notApiPart = notApiArr.join('/');
    window.location.hash = notApiPart;
}

const bind = () => {
    router(Renderer)
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
