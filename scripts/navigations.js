const fetchScriptsIfNeeded = async (element) => {
    const scriptNames = element.getAttribute('data-scripts');
    if (!scriptNames) return[];
    const scriptNamesArray = scriptNames.split('|');
    const scripts = await fetchScripts(scriptNamesArray);
    return scripts
}

const placeScriptsInHeadSection = (scripts) => {
    // const head = document.getElementsByTagName('head')[0]
    scripts.forEach((script) => {
        const scriptNode = document.createElement("script");
        scriptNode.text = script
        console.dir(document.head)
        console.log(scriptNode)
        document.head.appendChild(scriptNode);
    })
}

const loadScripts = async (element) => {
    const scriptContent = await fetchScriptsIfNeeded(element);
    placeScriptsInHeadSection(scriptContent);
}

const fetchScripts = async (scriptNames) => {
    if (!scriptNames) return;
    const responces = scriptNames.map((name) => fetch(getUrl(name), {
        headers: {
            "Content-Type": 'text/javascript',
            "Sec-Fetch-Dest": 'script'
        }
    }))
    const scriptResponses = await Promise.all(responces)
    const scriptsPromisses = scriptResponses.map((res) => getBody(res));
    const scripts = await Promise.all(scriptsPromisses);
    return scripts
}

const bindNavigations = (renderer) => {
    options = document.querySelectorAll('[data-role="nav-item"]')
    console.log(options)
    for (let option of options) {
        const endpoint = option.getAttribute('data-endpoint')
        option.addEventListener('click', async () => {
            // const scripts = await fetchScriptsIfNeeded(option)
            // console.log(scripts)
            await loadScripts(option)
            const result = await fetch(getUrl(endpoint));
            const messageBody = await getBody(result)
            renderer.replaceContent(messageBody, endpoint)
            console.log(messageBody)
            console.log(result)
        })
    }
}

window.onload = () => bindNavigations(Renderer)
