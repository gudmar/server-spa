import { NAVIGATION } from "./navigation.js";

export const getApp = async (req, res) => {
        const locals = {
            title: 'SPA',
            navigations: NAVIGATION,
            scripts: [
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
