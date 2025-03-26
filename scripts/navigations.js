const bindNavigations = () => {
    options = document.querySelectorAll('[data-role="nav-item"]')
    for (let option of options) {
        const endpoint = option.getAttribute('data-endpoint')
        option.addEventListener('click', () => {
            updateHash(endpoint)
        })
    }
}

window.onload = () => bindNavigations(Renderer)
