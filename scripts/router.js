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

const loadHashWithCleaner = async (renderer) => {
    const reaper = new GrimReaper();
    reaper.doHarvest();
    loadHash(renderer);
}

const loadHash = async (renderer) => {
    const hash = window.location.hash?.substring(1);
    if (hash === '') {
        await fetchLocation();
        return
    }
    const endpoint = hash ? 'api/' + hash : '';
    const scripts = DEPENDENCIES?.[endpoint]?.scripts || []
    const styles = DEPENDENCIES?.[endpoint]?.styles || []
    await load({ endpoint, styles, scripts, renderer })
}

const fetchLocation = async() => {
    console.log('Fetch location')
    const res = await fetch(window.location)
    console.log(res)
}

const router = async (renderer) => {
    console.log('Router launch')
    window.onhashchange = () => loadHashWithCleaner(renderer)//getOnContentLoad(renderer)
    await loadHashWithCleaner(renderer)
}

const updateHash = (apiEntpoint) => {
    const notApiArr = apiEntpoint.split('/');
    notApiArr.splice(0, 1);
    const notApiPart = notApiArr.join('/');
    if (notApiPart) {
        window.location.hash = notApiPart
    } else {
        window.location.href = window.location.href.split('#')[0]
    }
    
}

const bind = () => {
    router(Renderer)
}

window.onload = bind

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        bind();
    })
} else {
    bind();
}
