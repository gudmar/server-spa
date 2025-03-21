const LOCATIONS = {
    'clock': '#content',
    'login': '#content',
    'stop-watch': '#content',
}

class Renderer {

    static domParser = new DOMParser();

    static replaceContent(html, endpoint) {
        // const element = Renderer.htmlStringToElement(html);
        const selector = LOCATIONS[endpoint];
        const location = document.querySelector(selector);
        console.log(location)
        location.innerHTML = html;
    }

    static htmlStringToElement(html) {
        const elements = Renderer.domParser.parseFromString(html, 'text/html');
        return elements.childNodes[0]
    }
}
