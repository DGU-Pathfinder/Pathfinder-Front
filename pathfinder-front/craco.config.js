const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@item-selected-color': '#F37321',
                            'menu-item-active-bg': '#F37321',
                            'menu-item-color': '#F37321',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
