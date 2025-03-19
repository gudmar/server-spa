const getBody = async (response) => {
    // if (response.redirected) window.location = response.url
    console.log(response)
    const reader = response.body.getReader()
    let result = ''
    await reader.read().then(function add(args) {
        const {done, value} = args;
        if (done) return;
        value.forEach((code) => {
            const char = String.fromCharCode(code)
            result += char
        })
        return reader.read().then(add)
    });
    return result
}