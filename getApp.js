import { NAVIGATION } from "./navigation.js";

export const getApp = async (req, res) => {
    console.log('getApp launched')
        const locals = {
            title: 'SPA',
            navigations: NAVIGATION,
            scripts: [
                'dependencies.js',
                'grimReaper.js',
                'renderer.js',
                'load.js',
                'getBody.js',
                'utils.js',
                'router.js',
                'navigations.js'
            ],
            styles: [
                'main.css',
                'navigations.css'
            ],
        }
        res.render('./pages/templates/indexWithNavTemplate.pug', locals)
};
