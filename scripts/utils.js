const getUrl = (endpoint) => `${window.location.origin}/${endpoint}`

const makeRequest = ({
    method, route, body, headers
}) => {
    if (method === 'GET' && body) {
        throw new Error('GET requests should NOT have a body')
    }
    const getRequest = () => fetch(getUrl(route), {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
    return getRequest()
}
