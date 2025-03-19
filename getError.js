export const getError = (req, res) => {
    const locals = {
        title: 'SPA',
        scripts: [],
        styles: ['error.css']
    }
    res.render('./pages/templates/noRoute.pug', locals)
}
