const bindNavigations = (renderer) => {
    options = document.querySelectorAll('[data-role="nav-item"]')
    console.log(options)
    for (let option of options) {
        const endpoint = option.getAttribute('data-endpoint')
        const styles =  option.getAttribute('data-styles').split('|');
        const scripts = option.getAttribute('data-scripts').split('|');
        option.addEventListener('click', () => {
            const reaper = new GrimReaper();
            reaper.doHarvest();
            updateHash(endpoint)
        })
    }
}

window.onload = () => bindNavigations(Renderer)
