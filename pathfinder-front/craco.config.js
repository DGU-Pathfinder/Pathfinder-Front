const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@btn-link-hover-bg': '#F37321',
                            '@btn-link-hover-color': '#F37321',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};