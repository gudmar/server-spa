const LOCATIONS = {
    'api/clock': '#content',
    'api/login': '#content',
    'api/stop-watch': '#content',
}

class Renderer {

    static domParser = new DOMParser();

    static replaceContent(html, endpoint) {
        const selector = LOCATIONS[endpoint];
        const location = document.querySelector(selector);
        location.innerHTML = html;
    }

    static htmlStringToElement(html) {
        const elements = Renderer.domParser.parseFromString(html, 'text/html');
        return elements.childNodes[0]
    }
}
