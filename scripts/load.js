const fetchScriptsIfNeeded = async (scriptNames) => {
    if (!scriptNames?.length) return[];
    const scripts = await fetchScripts(scriptNames);
    return scripts
}

const fetchStylesIfNeeded = async (element) => {
    const fileNames = element.getAttribute('data-styles');
    if (!fileNames?.length) return[];
    const fileNamesArray = fileNames.split('|');
    const files = await fetchStyles(fileNamesArray);
    return files
}

const placeScriptsInHeadSection = (scripts) => {
    scripts.forEach((script) => {
        const scriptNode = document.createElement("script");
        scriptNode.text = script
        console.dir(document.head)
        console.log(scriptNode)
        document.head.appendChild(scriptNode);
    })
}

const placeStylesInHeadSection = (styles) => {
    styles.forEach((style) => {
        const styleNode = document.createElement("style")
        style.innerHTML = style
        console.dir(styleNode)
        document.head.appendChild(styleNode);
    })
}


const loadScripts = async (element) => {
    const scriptContent = await fetchScriptsIfNeeded(element);
    placeScriptsInHeadSection(scriptContent);
}

const loadStyles = async (fileNames) => {
    if (!(fileNames?.length)) return;
    fileNames.forEach((name) => {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = name
        document.head.appendChild(link)
    })
}


const fetchScripts = async (scriptNames) => {
    if (!scriptNames?.length) return;
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

const fetchStyles = async (scriptNames) => {
    if (!scriptNames) return;
    const res = scriptNames.map((name) => fetch(getUrl(name), {
        headers: {
            "Content-Type": 'text/css',
        }
    })) 
    const responses = await Promise.all(res)
    const promisses = responses.map((res) => getBody(res));
    const content = await Promise.all(promisses);
    return content
}

const load = async ({ endpoint, styles, scripts, renderer }) => {
    await loadStyles(styles)
    const result = await fetch(getUrl(endpoint));
    const messageBody = await getBody(result)
    renderer.replaceContent(messageBody, endpoint)
    await loadScripts(scripts)
}
